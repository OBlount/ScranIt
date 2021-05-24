const mongoose = require('mongoose');

export const roomSchema = new mongoose.Schema({
	urlToken: {
		type: String,
		required: true,
	},

	masterToken: {
		type: String,
		required: true,
	},

	partnerToken: {
		type: String,
		required: false,
	},

	locationSetting: {
		type: String,
		enum: ['Master', 'Partner', 'MiddleGround'],
		default: 'Master',
		required: false,
	},

	masterLocation: {
		Latitude: {
			type: Number,
			required: false,
		},
		Longitude: {
			type: Number,
			required: false,
		},
	},

	partnerLocation: {
		Latitude: {
			type: Number,
			required: false,
		},
		Longitude: {
			type: Number,
			required: false,
		},
	},

	expiryDate: {
		type: Date,
		required: true,
	},
});
