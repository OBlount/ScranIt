<template>
	<div id="roomCreator">
		<br />
		<button @click="RequestNewRoom">Create Room</button>
	</div>
</template>

<script lang="ts">
	import { AxiosResponse } from 'axios';
	import { Vue } from 'vue-class-component';
	import services from '../services/session';
	import Room from '@/views/Room.vue';
	import store from '@/store';
	import { VueCookieNext } from 'vue-cookie-next';

	export default class RoomCreatorComponent extends Vue {
		// Post to API:
		private async RequestNewRoom(): Promise<void> {
			const generateRoom:
				| AxiosResponse<any>
				| undefined = await services.CreateRoom({
				locationSetting: store.state.locationSetting,
			});

			if (generateRoom?.data.isSuccess) {
				const res: {
					isSuccess: boolean;
					urlToken: string;
					masterToken: string;
				} = generateRoom.data;

				// First create a master session cookie that equates to the masterToken sent by API:
				VueCookieNext.setCookie(
					`masterSession: ${res.urlToken}`,
					res.masterToken,
					{ expire: '2h' }
				);

				// Redirect to the newly created room's url:
				this.$router.addRoute({
					path: `/${res.urlToken}`,
					component: Room,
				});
				this.$router.push(res.urlToken);
			}
		}
	}
</script>

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
</style>
