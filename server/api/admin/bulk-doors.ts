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

		// Système hybride : Storage + Import statique
		const storage = useStorage();
		let data = (await storage.getItem("doors.json")) as any;

		// Si pas dans le storage, charge depuis le fichier original
		if (!data) {
			const doorsModule = await import("~/data/doors.json");
			data = doorsModule.default || doorsModule;
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

		// Sauvegarder dans le storage Nitro (persistant sur Vercel)
		await storage.setItem("doors.json", data);

		return {
			success: true,
			action,
			targetStatus,
			totalDoors: data.doors.length,
			updatedCount,
			doors: data.doors,
			message: `✅ ${updatedCount} portes modifiées et sauvegardées.`,
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
