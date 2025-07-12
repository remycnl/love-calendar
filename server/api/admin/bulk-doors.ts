import { promises as fs } from "fs";
import { join } from "path";

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
		
		// Vérifier le token en utilisant la variable d'environnement
		const config = useRuntimeConfig();
		const secretPassword = config.secretPassword;
		
		if (!secretPassword) {
			throw createError({
				statusCode: 500,
				statusMessage: "Configuration serveur invalide",
			});
		}
		
		// Générer le token attendu basé sur le mot de passe secret
		const expectedToken = Buffer.from(secretPassword).toString('base64');
		
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

		// Lire le fichier JSON
		const filePath = join(process.cwd(), "public", "doors.json");
		const fileContent = await fs.readFile(filePath, "utf-8");
		const data = JSON.parse(fileContent);

		// Définir le statut cible
		const targetStatus = action === "open_all";

		// Mettre à jour TOUTES les enveloppes sans condition - forcer l'écriture
		let updatedCount = 0;
		data.doors.forEach((door: any) => {
			if (door.opened !== targetStatus) {
				updatedCount++;
			}
			// Forcer l'état pour TOUTES les enveloppes
			door.opened = targetStatus;
		});

		// Sauvegarder le fichier avec gestion d'erreur améliorée
		try {
			await fs.writeFile(filePath, JSON.stringify(data, null, 2));
		} catch (writeError) {
			console.error("Erreur lors de l'écriture du fichier:", writeError);
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la sauvegarde des données",
			});
		}

		return {
			success: true,
			action: action,
			targetStatus: targetStatus,
			totalDoors: data.doors.length,
			updatedCount: updatedCount,
			doors: data.doors,
		};
	} catch (error: any) {
		console.error("Erreur lors de l'opération en masse:", error);
		
		// Gestion plus détaillée des erreurs
		if (error.statusCode) {
			// L'erreur a déjà un code de statut (createError)
			throw error;
		}
		
		// Erreur générique
		throw createError({
			statusCode: 500,
			statusMessage: `Erreur lors de l'opération en masse: ${error.message || 'Erreur inconnue'}`,
		});
	}
});
