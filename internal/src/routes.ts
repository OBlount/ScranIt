const mongoose = require('mongoose');
import shortuuid = require('short-uuid');
import { Application, Request, Response, NextFunction } from 'express';
import { findAllInDB, createARoom, addAPartnerToken } from './mongooseUtil';
import { roomSchema } from './schemas';

const serverOnBootTime: string = new Date().toLocaleString();
const roomModel: any = mongoose.model('room', roomSchema);

export default (server: Application) => {
	server.get('/', async (req: Request, res: Response, next: NextFunction) => {
		res.send(
			`
      			<h1 style="text-align:center;">Server Online</h1><br>
      			<p style="text-align:center;">Booted on the: ${serverOnBootTime} (UTC)</p><br>
      		`
		);
		console.info(await findAllInDB(roomModel));
	});

	server.post(
		'/addRoom',
		async (req: Request, res: Response, next: NextFunction) => {
			// Create uuID's:
			const urlTokenID: string = shortuuid.generate();
			const masterTokenID: string = shortuuid.generate();
			let eDate = new Date();
			eDate.setHours(eDate.getHours() + 1);

			// Grab the locationSetting from req:
			const locSetting = req.body.locationSetting;

			// Create a room:
			const isRoomSuccess: Boolean = await createARoom(
				roomModel,
				urlTokenID,
				masterTokenID,
				locSetting,
				eDate
			);

			res.send({
				isSuccess: isRoomSuccess,
				urlToken: urlTokenID,
				masterToken: masterTokenID,
			});

			if (isRoomSuccess) {
				console.info(
					`[PROCESS] - Created new room at '/${urlTokenID}'`
				);
			}
		}
	);

	server.post(
		'/queryRoomExistence',
		async (req: Request, res: Response, next: NextFunction) => {
			// Find the correct record in the db and add the location data:
			const urlTokenID: string = req.body.urlToken || null;

			const docs: any = await roomModel.find({
				urlToken: req.body.urlToken,
			});

			if (docs[0]?.urlToken && !docs[0]?.partnerToken) {
				// Create a partnerToken:
				const partnerTokenID: string = shortuuid.generate();

				// Add the partnerToken to the record:
				const addedPartnerToken: Boolean = await addAPartnerToken(
					roomModel,
					urlTokenID,
					partnerTokenID
				);

				if (addedPartnerToken) {
					res.send({
						isReal: true,
						partnerToken: partnerTokenID,
					});
				} else {
					res.send({
						isReal: false,
						partnerToken: null,
					});
				}
			} else {
				res.send({
					isReal: false,
					partnerToken: null,
				});
			}
		}
	);
};
