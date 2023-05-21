import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

import First from '@/components/view/First.vue'
import Creation from '@/components/view/Creation.vue'
import Index from "@/components/view/Index.vue";
import Auth from "@/components/view/Auth.vue";
import Login from "@/components/view/Login.vue";
import Register from "@/components/view/Register.vue"
import PlayView from "@/components/view/PlayView.vue";
import store from "@/store";
import Comic from "@/components/view/Comic.vue";
import Upload from "@/components/view/Upload.vue";
import CreateIndex from "@/components/view/CreateIndex.vue";
import DataCenter from "@/components/view/DataCenter.vue";
import VideoCenter from "@/components/view/VideoCenter.vue";
import UserCenter from "@/components/view/UserCenter.vue";
import SearchView from "@/components/view/SearchView.vue";
import Exam from "@/components/view/Exam.vue";

const router = new Router({
	base:'/',
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/index/first'
		},
		{
			path: '/index',
			component: Index,
			redirect: '/index/first',
			children:[
				{
					path: 'first',
					component: First,
				},
				{
					path: 'comic',
					component: Comic
				},
				{
					path: 'search',
					component: SearchView
				}
			]
		},
		{
			path: '/creation',
			component: Creation,
			redirect: '/creation/index',
			children:[
				{
					path: 'upload',
					component: Upload,
					meta: {
						needLogin: true
					}
				},
				{
					path: 'index',
					component: CreateIndex,
					meta: {
						needLogin: true
					}
				},
				{
					path: 'data',
					component: DataCenter,
					meta: {
						needLogin: true
					}
				},
				{
					path: 'video',
					component: VideoCenter,
					meta: {
						needLogin: true
					}
				}
			]
		},
		{
			path:'/auth',
			component:Auth,
			children:[
				{
					path: 'login',
					component: Login,
					meta:{
						show:false
					}
				},
				{
					path: 'register',
					component: Register,
					meta:{
						show:false
					}
				}
			],
			meta:{
				show:true
			}
		},
		{
			path: '/play',
			component: PlayView,
			name: 'play'
		},
		{
			path: '/ucenter',
			component: UserCenter,
			meta:{
				needLogin: true
			}
		},
		{
			path: '/exam',
			component: Exam,
			meta:{
				needLogin: true
			}
		}
	]
})
router.beforeEach((to,from,next)=>{
	if (to.meta.needLogin){
		if (store.state.token){
			next()
		}else{
			next({
				path: '/auth/login',
				query:{
					redirect:to.fullPath
				}
			})
		}
	}else{
		next()
	}


})
export default router
