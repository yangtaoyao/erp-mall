/**
 * @Author: 
 * @Date: 2018/1/19
 * @Last Modified by:   
 * @Last Modified time: 2018-02-21 17:54:26
 */
import Vue from 'vue'
import App from './App.vue'
import router from 'routes'
import store from 'store'
import './permission'
import _ from 'lodash'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})