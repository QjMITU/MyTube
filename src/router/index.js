import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

import First from '@/components/view/First.vue'
import Creation from '@/components/view/Creation.vue'

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/index'
		},
		{
			path: '/index',
			component: First
		},
		{
			path: '/creation',
			component: Creation
		}
	]
})
export default router