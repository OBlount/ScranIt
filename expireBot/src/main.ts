import bot from './bot';
import dotenv = require('dotenv');
import { promisify } from 'util';

dotenv.config();
const sleep = promisify(setTimeout);

// Major variables:
const CONNECTION_STRING: string = process.env.CONNECTION_STRING || 'UNDEFINED';
const PURGE_COOLDOWN: number = 1000 * 60 * 30; // 30 minutes

// Create the bot:
const expBot = new bot(PURGE_COOLDOWN);

async function main(): Promise<void> {
	// Connect to the db:
	const isConected: boolean = await expBot.connectToMongoDB(
		CONNECTION_STRING
	);

	if (isConected) {
		console.info('[SUCCESS] - Connected to MongoDB successfully');

		// Once connected, loop forever to purge expired rooms:
		console.info('[PROCESS] - Ready to purge...');

		// Infinite loop:
		for (;;) {
			// Sleep:
			await sleep(expBot.PURGE_COOLDOWN);

			// Call purge method:
			let cDate: Date = new Date();
			console.info(
				`[PROCESS] [${cDate.toLocaleString()}] - Beginning purge...`
			);
			await expBot.purgeExpiredRooms();
		}
	} else {
		console.info("[ERROR] - Couldn't connect to MongoDB");
	}
}

main();
