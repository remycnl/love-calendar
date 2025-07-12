export default defineEventHandler(async (event) => {
	const method = event.method;

	if (method === "GET") {
		const authHeader = getHeader(event, "authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw createError({
				statusCode: 401,
				statusMessage: "Token manquant",
			});
		}

		const token = authHeader.substring(7);

		try {
			// Utiliser la variable d'environnement pour vérifier le token
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
			
			if (token === expectedToken) {
				return {
					success: true,
					valid: true,
					message: "Token valide",
				};
			}

			throw createError({
				statusCode: 401,
				statusMessage: "Token invalide",
			});
		} catch (error: any) {
			if (error.statusCode) {
				throw error;
			}
			throw createError({
				statusCode: 401,
				statusMessage: "Token invalide",
			});
		}
	}

	throw createError({
		statusCode: 405,
		statusMessage: "Méthode non autorisée",
	});
});
