/*
 * @Author: your name
 * @Date: 2020-10-29 18:16:11
 * @LastEditTime: 2020-10-30 09:45:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\front\src\store\mutations.js
 */
const mutations = {
  userLogin (state, userData) {
    state.userInfo = Object.assign({}, state.userInfo, userData)
  },
  navList (state, navList) {
    state.navList = navList
  }
}
export default mutations
