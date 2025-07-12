import prisma from "../../../lib/prisma";

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

        const targetStatus = action === "open_all";
        // Mettre à jour toutes les portes
        const updated = await prisma.door.updateMany({
            data: { opened: targetStatus },
        });
        // Récupérer toutes les portes après update
        const doors = await prisma.door.findMany({ orderBy: { week: 'asc' } });

        return {
            success: true,
            action,
            targetStatus,
            totalDoors: doors.length,
            updatedCount: updated.count,
            doors,
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