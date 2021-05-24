import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Catch from '../views/404Catch.vue';
import RoomFinder from '../views/RoomFinder.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},

	{
		path: '/PageNotFound',
		name: 'Catch',
		component: Catch,
	},

	{
		path: '/:catchAll(.*)',
		name: 'RoomFinder',
		component: RoomFinder,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
