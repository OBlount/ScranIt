import express = require('express');
import dotenv = require('dotenv');
import cors = require('cors');
import routes from './routes';
import { connectToMongoDB, clearDB } from './mongooseUtil';

dotenv.config();
const server: express.Application = express();
const port: string | number = process.env.PORT || 8081;

// Middleware:
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

routes(server);

server.listen(port, () => {
	console.log(`[PROCESS] - Listening on port: ${port}`);
	// connect to MongoDB:
	if (connectToMongoDB(process.env.CONNECTION_STRING || '')) {
		console.info('[SUCCESS] - Connected to MongoDB successfully');
		clearDB();
		console.info('[PROCESS] - Cleared database successfully');
	} else {
		console.info("[ERROR] - Couldn't connect to MongoDB");
	}
});
