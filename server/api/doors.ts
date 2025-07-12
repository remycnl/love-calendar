import { promises as fs } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
	const method = event.method;

	if (method === "POST") {
		try {
			const { week, action = "toggle" } = await readBody(event);

			if (!week || week < 1 || week > 52) {
				throw createError({
					statusCode: 400,
					statusMessage: "Numéro d'enveloppe invalide",
				});
			}

			// Lire le fichier JSON
			const filePath = join(process.cwd(), "data", "doors.json");
			const fileContent = await fs.readFile(filePath, "utf-8");
			const data = JSON.parse(fileContent);

			// Trouver l'enveloppe
			const door = data.doors.find((d: any) => d.week === week);
			if (!door) {
				throw createError({
					statusCode: 404,
					statusMessage: "Enveloppe non trouvée",
				});
			}

			// Actions possibles: toggle, open, close
			if (action === "toggle") {
				door.opened = !door.opened;
			} else if (action === "open") {
				door.opened = true;
			} else if (action === "close") {
				door.opened = false;
			}

			// Sauvegarder le fichier
			await fs.writeFile(filePath, JSON.stringify(data, null, 2));

			return {
				success: true,
				door,
				action: door.opened ? "opened" : "closed",
			};
		} catch (error) {
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la modification de l'enveloppe",
			});
		}
	}

	// GET request - retourner toutes les enveloppes
	try {
		const filePath = join(process.cwd(), "data", "doors.json");
		const fileContent = await fs.readFile(filePath, "utf-8");
		const data = JSON.parse(fileContent);

		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: "Erreur lors du chargement des enveloppes",
		});
	}
});
