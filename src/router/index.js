import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
	routes: [
			{
				path: '/',
				name: '后台主页',
				redirect:'/admin_index/wel',
				component: r => require.ensure([], () => r(require('@/manager/admin_index.vue')), 'admin_index'),
			},
			{
			path: '/admin_index',
			name: '后台主页',
			redirect:'/admin_index/wel',
			component: r => require.ensure([], () => r(require('@/manager/admin_index.vue')), 'admin_index'),
			children:[{
				path:'/admin_index/wel',
				name: 'welcome',
				component:r => require.ensure([], () => r(require('@/manager/admin_index_welcome.vue')), 'welcome'),
			},{
				path:'/admin_index/shenpi',
				name: 'shenpi',
				component:r => require.ensure([], () => r(require('@/manager/admin_index_shenpi.vue')), 'shenpi'),
			},{
				path:'/admin_index/product',
				name: 'product',
				component: r => require.ensure([], () => r(require('@/manager/admin_index_product.vue')), 'product'),
			},
			//
			{
				path:'/admin_index/emptypage',
				name: 'reloadpage',
				component: r => require.ensure([], () => r(require('@/manager/admin_index_emptypage.vue')), 'emptypage'),
			}]
		}
	]
})