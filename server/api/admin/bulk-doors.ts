export default defineEventHandler(async (event) => {
    const method = event.method;
    
    if (method !== "POST") {
        throw createError({
            statusCode: 405,
            statusMessage: "Méthode non autorisée",
        });
    }

    try {
        // Vérifier l'authentification
        const authHeader = getHeader(event, "authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw createError({
                statusCode: 401,
                statusMessage: "Token d'authentification requis",
            });
        }

        const token = authHeader.split(" ")[1];
        const config = useRuntimeConfig();
        const secretPassword = config.secretPassword;

        if (!secretPassword) {
            throw createError({
                statusCode: 500,
                statusMessage: "Configuration serveur invalide",
            });
        }

        const expectedToken = Buffer.from(secretPassword).toString("base64");
        if (token !== expectedToken) {
            throw createError({
                statusCode: 401,
                statusMessage: "Token invalide",
            });
        }

        const { action } = await readBody(event);

        if (!action || !["open_all", "close_all"].includes(action)) {
            throw createError({
                statusCode: 400,
                statusMessage: "Action invalide. Utilisez 'open_all' ou 'close_all'",
            });
        }

        const storage = useStorage();
        
        // Charger le fichier original pour comparer
        const doorsModule = await import('~/data/doors.json');
        const originalData = doorsModule.default || doorsModule;
        
        // Créer un hash du fichier original pour détecter les changements
        const originalHash = Buffer.from(JSON.stringify(originalData)).toString('base64');
        
        // Récupérer les données du storage et son hash
        const storageData = await storage.getItem('doors.json') as any;
        const storedHash = await storage.getItem('doors.json.hash') as string;
        
        let data;
        let dataSource = '';
        
        // Si le fichier original a changé depuis la dernière sauvegarde
        if (!storedHash || storedHash !== originalHash) {
            // Utiliser le fichier original (il a été modifié)
            data = JSON.parse(JSON.stringify(originalData)); // Deep copy
            dataSource = 'fichier original (détecté comme modifié)';
            
            // Sauvegarder le nouveau hash
            await storage.setItem('doors.json.hash', originalHash);
        } else if (storageData) {
            // Utiliser les données du storage (pas de changement dans le fichier)
            data = storageData;
            dataSource = 'storage (données précédentes)';
        } else {
            // Fallback sur le fichier original
            data = JSON.parse(JSON.stringify(originalData));
            dataSource = 'fichier original (première utilisation)';
        }

        // Modifier les données
        const targetStatus = action === "open_all";
        let updatedCount = 0;
        
        data.doors.forEach((door: any) => {
            if (door.opened !== targetStatus) {
                updatedCount++;
            }
            door.opened = targetStatus;
        });

        // Sauvegarder les données modifiées
        await storage.setItem('doors.json', data);

        return {
            success: true,
            action,
            targetStatus,
            totalDoors: data.doors.length,
            updatedCount,
            doors: data.doors,
            dataSource,
            message: `✅ ${updatedCount} portes modifiées et sauvegardées.`,
            debug: {
                originalHash: originalHash.substring(0, 10) + '...',
                storedHash: storedHash ? storedHash.substring(0, 10) + '...' : 'aucun',
                fileChanged: !storedHash || storedHash !== originalHash
            }
        };

    } catch (error: any) {
        console.error("Erreur lors de l'opération en masse:", error);
        
        if (error.statusCode) throw error;

        throw createError({
            statusCode: 500,
            statusMessage: `Erreur lors de l'opération en masse: ${
                error.message || "Erreur inconnue"
            }`,
        });
    }
});