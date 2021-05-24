const mongoose = require('mongoose');
import { roomSchema } from './schemas';

const roomModel: any = mongoose.model('room', roomSchema);

export default class bot {
	PURGE_COOLDOWN: number;

	constructor(pCoolDown: number) {
		this.PURGE_COOLDOWN = pCoolDown;
	}

	// Returns every record on the db:
	private async getAllRoomRecords(): Promise<any> {
		try {
			return await roomModel.find();
		} catch {
			return undefined;
		}
	}

	// The connection method to connect to the mongoDB:
	public async connectToMongoDB(connectionString: string): Promise<boolean> {
		try {
			await mongoose.connect(connectionString, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			return true;
		} catch {
			return false;
		}
	}

	// A script that compares the expiry date with the current one. It will purge all records which exceed the expDate:
	public async purgeExpiredRooms(): Promise<void> {
		const currentDate: Date = new Date();
		const allRecords: any[] = await this.getAllRoomRecords();

		if (allRecords) {
			allRecords.forEach(async (room) => {
				if (room['expiryDate'] <= currentDate) {
					// The room has reached expiry:
					try {
						await roomModel.findOneAndDelete({ _id: room['_id'] });
						console.info(
							`[SUCCESS] - Removed roomID: ${room['_id']}`
						);
					} catch {
						// CRITICAL ERROR:
						console.info(
							`[ERROR] - Can\'t remove roomID: ${room['_id']}`
						);
					}
				}
			});
		}
	}
}
