import { promises as fs } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
	const method = event.method;

	// Vérification simple du token (en production, utilisez une méthode plus sécurisée)
	const authHeader = getHeader(event, "authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw createError({
			statusCode: 401,
			statusMessage: "Token requis",
		});
	}

	if (method === "PUT") {
		try {
			const { week, title, text } = await readBody(event);

			if (!week || !title || !text) {
				throw createError({
					statusCode: 400,
					statusMessage: "Données manquantes",
				});
			}

			// Lire le fichier JSON
			const filePath = join(process.cwd(), "public", "doors.json");
			const fileContent = await fs.readFile(filePath, "utf-8");
			const data = JSON.parse(fileContent);

			// Trouver et modifier l'enveloppe
			const doorIndex = data.doors.findIndex((d: any) => d.week === week);
			if (doorIndex === -1) {
				throw createError({
					statusCode: 404,
					statusMessage: "Enveloppe non trouvée",
				});
			}

			// Mettre à jour les données
			data.doors[doorIndex].title = title;
			data.doors[doorIndex].text = text;

			// Sauvegarder le fichier
			await fs.writeFile(filePath, JSON.stringify(data, null, 2));

			return {
				success: true,
				door: data.doors[doorIndex],
				message: "Enveloppe mise à jour avec succès",
			};
		} catch (error) {
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la mise à jour",
			});
		}
	}

	throw createError({
		statusCode: 405,
		statusMessage: "Méthode non autorisée",
	});
});
