import Api from '@/services/Api';

export default {
	CreateRoom(payload: { locationSetting: string }) {
		try {
			return Api().post('addRoom', payload);
		} catch {
			console.log(`[ERROR] Can't reach '${Api().getUri()}'`);
		}
	},

	QueryRoomExistence(payload: { urlToken: string }) {
		try {
			return Api().post('queryRoomExistence', payload);
		} catch {
			console.log(`[ERROR] Can't reach '${Api().getUri()}'`);
		}
	},
};
