/*
 * @Author: your name
 * @Date: 2020-10-29 18:16:11
 * @LastEditTime: 2020-10-30 09:22:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\front\src\store\actions.js
 */
import { circle } from '@/common/httpN'
const actions = {
  userLogin: ({commit}, userData) => commit('userLogin', userData), /* 用户信息存储 */
  //getUserInfo: ({commit}) => { // 检验是否登录请求
  getUserInfo: () => { // 检验是否登录请求
    return circle.loginIn()
  }
}

export default actions
