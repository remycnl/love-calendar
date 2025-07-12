import { promises as fs } from 'fs';
import { resolve } from 'path';

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

		// Lire et écrire UNIQUEMENT dans le fichier data/doors.json
		const filePath = resolve(process.cwd(), 'data/doors.json');
		let fileContent = await fs.readFile(filePath, 'utf-8');
		let data = JSON.parse(fileContent);

		const targetStatus = action === "open_all";
		let updatedCount = 0;
		(data.doors as any[]).forEach((door: any) => {
			if (door.opened !== targetStatus) {
				updatedCount++;
			}
			door.opened = targetStatus;
		});

		try {
			await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
		} catch (writeError) {
			console.error("Erreur lors de l'écriture dans le fichier:", writeError);
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la sauvegarde des données dans le fichier doors.json",
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
	} catch (error) {
		console.error("Erreur lors de l'opération en masse:", error);
		const err = error as any;
		if (err.statusCode) {
			throw err;
		}
		throw createError({
			statusCode: 500,
			statusMessage: `Erreur lors de l'opération en masse: ${err.message || 'Erreur inconnue'}`,
		});
	}
});