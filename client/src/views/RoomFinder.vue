<template>
	<!-- Nothing should be shown to the user | Below is debugging -->
	<div class="Finder">
		<h1>FINDING...</h1>
	</div>
</template>

<script lang="ts">
	import { Vue } from 'vue-class-component';
	import { AxiosResponse } from 'axios';
	import services from '../services/session';
	import Room from '@/views/Room.vue';
	import { VueCookieNext } from 'vue-cookie-next';

	export default class RoomeFinder extends Vue {
		// On creation:
		async mounted() {
			// Query if the room exists in the db:
			const path: string = this.$router.currentRoute.value.path.split(
				'/'
			)[1];
			const doesRoomExistRes:
				| AxiosResponse<any>
				| undefined = await services.QueryRoomExistence({
				urlToken: path,
			});

			if (doesRoomExistRes?.data.isReal) {
				// If the room exists on the db, create a partner session cookie that equates to the partnerToken:
				VueCookieNext.setCookie(
					`partnerSession: ${path}`,
					doesRoomExistRes.data.partnerToken,
					{ expire: '2h' }
				);

				// Then add to router + redirect:
				this.$router.addRoute({ path: `/${path}`, component: Room });
				this.$router.push(`$/${path}`);
			} else {
				this.$router.push('/PageNotFound');
			}
		}
	}
</script>
