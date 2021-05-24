<template>
	<div id="locationSetting">
		<input
			type="radio"
			id="Master"
			name="location"
			checked
			@click="onLocationButton(0)"
		/>
		<label for="Master">Your Location</label>

		<br />

		<input
			type="radio"
			id="Partner"
			name="location"
			@click="onLocationButton(1)"
		/>
		<label for="Partner">Your Partner's Location</label>

		<br />

		<input
			type="radio"
			id="MiddleGround"
			name="location"
			@click="onLocationButton(2)"
		/>
		<label for="MiddleGround">Meet In The Middle</label>
	</div>
</template>

<script lang="ts">
	import { Vue } from 'vue-class-component';
	import store from '../store/index';

	export default class SetLocationComponent extends Vue {
		// Update the state value when the radio buttons are selected:
		public onLocationButton(settingType: number): void {
			store.dispatch('CHANGE_LOCATION_SETTING', settingType);
		}
	}
</script>

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
</style>
