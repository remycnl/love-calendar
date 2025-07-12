import prisma from "../../../lib/prisma";

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

			const door = await prisma.door.findUnique({ where: { week } });
			if (!door) {
				throw createError({
					statusCode: 404,
					statusMessage: "Enveloppe non trouvée",
				});
			}

			let newOpened = door.opened;
			if (action === "toggle") newOpened = !door.opened;
			else if (action === "open") newOpened = true;
			else if (action === "close") newOpened = false;

			const updated = await prisma.door.update({
				where: { week },
				data: { opened: newOpened },
			});

			return {
				success: true,
				door: updated,
				action: updated.opened ? "opened" : "closed",
			};
		} catch (error) {
			console.error("Erreur POST doors:", error);
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la modification de l'enveloppe",
			});
		}
	}

	if (method === "PUT") {
		try {
			const { week, title, text } = await readBody(event);

			if (!week || week < 1 || week > 52) {
				throw createError({
					statusCode: 400,
					statusMessage: "Numéro d'enveloppe invalide",
				});
			}

			const door = await prisma.door.findUnique({ where: { week } });
			if (!door) {
				throw createError({
					statusCode: 404,
					statusMessage: "Enveloppe non trouvée",
				});
			}

			const updated = await prisma.door.update({
				where: { week },
				data: {
					title: typeof title === 'string' ? title : door.title,
					text: typeof text === 'string' ? text : door.text,
				},
			});

			return {
				success: true,
				door: updated,
			};
		} catch (error) {
			console.error("Erreur PUT doors:", error);
			throw createError({
				statusCode: 500,
				statusMessage: "Erreur lors de la modification de l'enveloppe (PUT)",
			});
		}
	}

	// GET request - retourner toutes les enveloppes
	try {
		const doors = await prisma.door.findMany({ orderBy: { week: 'asc' } });
		return { doors };
	} catch (error) {
		console.error("Erreur GET doors:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Erreur lors du chargement des enveloppes",
		});
	}
});
