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

			// Lire les données via import statique
			const doorsModule = await import("~/data/doors.json");
			const data = doorsModule.default || doorsModule;

			// Trouver l'enveloppe
			const door = data.doors.find((d) => d.week === week);
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

			// Pour les modifications, utiliser le storage Nitro
			const storage = useStorage();
			await storage.setItem("doors.json", data);

			return {
				success: true,
				door,
				action: door.opened ? "opened" : "closed",
			};
		} catch (error) {
			console.error("Erreur POST doors:", error);
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la modification de l'enveloppe",
			});
		}
	}

	// GET request - retourner toutes les enveloppes
	try {
		// Essaie d'abord depuis le storage
		const storage = useStorage();
		let data = await storage.getItem("doors.json");

		// Si pas dans le storage, charge depuis le fichier
		if (!data) {
			const doorsModule = await import("~/data/doors.json");
			data = doorsModule.default || doorsModule;
		}

		return data;
	} catch (error) {
		console.error("Erreur GET doors:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Erreur lors du chargement des enveloppes",
		});
	}
});
