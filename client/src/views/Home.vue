<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<h1>Select location:</h1>
		<SetLocationComponent />
		<RoomCreatorComponent />
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component';
	import RoomCreatorComponent from '../components/RoomCreatorComponent.vue';
	import SetLocationComponent from '../components/SetLocationComponent.vue';

	@Options({
		components: {
			RoomCreatorComponent,
			SetLocationComponent,
		},
	})
	export default class Home extends Vue {}
</script>
