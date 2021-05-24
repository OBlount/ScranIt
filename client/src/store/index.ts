import { createStore } from 'vuex';

export default createStore({
	state: {
		locationSetting: 'Master',
	},
	mutations: {
		IS_MASTER_LOCATION: (state): void => {
			state.locationSetting = 'Master';
		},

		IS_PARTNER_LOCATION: (state): void => {
			state.locationSetting = 'Partner';
		},

		IS_MIDDLEGROUND_LOCATION: (state): void => {
			state.locationSetting = 'MiddleGround';
		},
	},
	actions: {
		CHANGE_LOCATION_SETTING: (context, payload: number): void => {
			switch (payload) {
				case 0:
					context.commit('IS_MASTER_LOCATION');
					break;

				case 1:
					context.commit('IS_PARTNER_LOCATION');
					break;

				case 2:
					context.commit('IS_MIDDLEGROUND_LOCATION');
					break;

				default:
					// Make the default setting 'Master'
					context.commit('IS_MASTER_LOCATION');
			}
		},
	},
	modules: {},
});
