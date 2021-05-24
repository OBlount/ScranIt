const mongoose = require('mongoose');

export async function connectToMongoDB(
	connectionString: string
): Promise<boolean> {
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

export async function clearDB(): Promise<boolean> {
	try {
		await mongoose.connection.dropDatabase();
		return true;
	} catch {
		return false;
	}
}

export async function findAllInDB(model: any): Promise<any> {
	try {
		return await model.find();
	} catch {
		return undefined;
	}
}

export async function createARoom(
	model: any,
	urlTokenID: string,
	masterTokenID: string,
	locSetting: string,
	eDate: Date
): Promise<boolean> {
	try {
		await model.create({
			urlToken: urlTokenID,
			masterToken: masterTokenID,
			locationSetting: locSetting,
			expiryDate: eDate,
		});
		return true;
	} catch {
		return false;
	}
}

export async function addAPartnerToken(
	model: any,
	urlTokenID: string,
	partnerTokenID: string
): Promise<boolean> {
	try {
		const filter = { urlToken: urlTokenID };
		const update = { partnerToken: partnerTokenID };
		const opts = { new: true, useFindAndModify: false };

		await model.findOneAndUpdate(filter, update, opts);
		return true;
	} catch {
		return false;
	}
}
