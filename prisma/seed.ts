import { PrismaClient } from "@prisma/client";
import doorsData from "../data/doors.json";

const prisma = new PrismaClient();

async function main() {
	for (const door of doorsData.doors) {
		await prisma.door.upsert({
			where: { week: door.week },
			update: {
				opened: door.opened,
				title: door.title,
				text: door.text,
			},
			create: {
				week: door.week,
				opened: door.opened,
				title: door.title,
				text: door.text,
			},
		});
	}
	console.log("✅ 52 doors imported!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
