export default defineEventHandler(async (event) => {
	const method = event.method;

	if (method === "POST") {
		const { password } = await readBody(event);

		// Utiliser la variable d'environnement pour le mot de passe
		const config = useRuntimeConfig();
		const ADMIN_PASSWORD = config.secretPassword;
		
		if (!ADMIN_PASSWORD) {
			throw createError({
				statusCode: 500,
				statusMessage: "Configuration serveur invalide",
			});
		}

		if (password === ADMIN_PASSWORD) {
			// Créer un token basé sur le mot de passe secret
			const token = Buffer.from(ADMIN_PASSWORD).toString('base64');

			return {
				success: true,
				token,
				message: "Authentification réussie",
			};
		} else {
			throw createError({
				statusCode: 401,
				statusMessage: "Mot de passe incorrect",
			});
		}
	}

	throw createError({
		statusCode: 405,
		statusMessage: "Méthode non autorisée",
	});
});
