/*
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-30 10:31:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\main.js
 */
import Vue from 'vue'
import App from './App'
import '@/static/css/main.css'
import http from '@/common/http'
import  {circle} from '@/common/httpN'
//Vue.config.productionTip = false

import store from '@/store/store'
Vue.use(http)
App.mpType = 'app'
App.store = store
const app = new Vue({
  ...App
})
app.$mount()
