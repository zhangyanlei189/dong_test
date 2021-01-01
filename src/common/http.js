/*
 * @Author: your name
 * @Date: 2020-10-22 10:49:17
 * @LastEditTime: 2020-10-30 22:25:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\common\http.js
 */
import store from '@/store/store'
import config from '@/common/config'
const MyPlugin = {
  install: function (Vue, options) {
    Vue.prototype.emptiness = function (str) {
      if(str == null || str == undefined || str == ''){
        return ''
      }else{
        return str
      }
    }
    // 处理url
    Vue.prototype.getUrl = function (url) {
      let getUrl = config.mockUrl + url
      return getUrl
    }
    //提示框
    Vue.prototype.showToast = function (info, iconType, myCustomClass) {
      wx.showToast({
        title: info,
        icon: iconType,
        duration: 1000
      })
    }

    Vue.prototype.loginIn = function (){//登录
      let that = this;
      wx.showLoading();
      let user = {};
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            user.code = res.code
            wx.getUserInfo({
              withCredentials: 'true',//是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期
              success: (result)=>{
                user.encryptedData = result.encryptedData;
                user.iv =  result.iv;
                wx.request({
                  url: that.getUrl('/user/wxlogin'),
                  data: user,
                  success (res){
                    if(res.data.code == 200){
                      wx.setStorage({//把用户信息存到storage
                        key:'user',
                        data:JSON.stringify(res.data.data),
                        success:()=>{
                         wx.hideLoading();
                         that.$emit('listenFromChild','close');
                        }
                      })
                      store.dispatch('userLogin',res.data.data);//将用户信息存到vuex
                      console.log(store.state.userInfo);//获取到的用户信息
                    }else{
                      wx.hideLoading();
                      that.showToast("请稍后重试！",'none')
                    }
                  },
                  fail: (res)=>{
                  }
                })
              },
              fail: (res)=>{
              },
              complete: ()=>{}
            });
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail (res){
          this.showToast('系统繁忙！','none')
        }
      })
    }
    Vue.prototype.loginFailure = function (file) {
      this.showToast('登录失效，请重新登录', 'error')
      let t = null
      clearTimeout(t)
      t = setTimeout(() => {
      /*  this.$router.push('/login')
        location.reload() // 主要是重新注入路由实例 */
      //  window.open(`${config.loginUrl}sso/login?redirect=${window.location.href}`, '_self')
        // wx.navigateTo({
        //   url:'/pages/index/index1'
        // })
        //this.loginIn();
        wx.navigateTo({//跳转到登录页
          ulr:"/pages/common/noLogin"
        })
      }, 1000)
    }
    // 处理返回数据 handle 为true时，组件自己处理返回数据
    Vue.prototype.handelResponse = function (res, cb, handle) {
      if (res.code == 2) { // 半小时不操作，返回登录页
        this.loginFailure()
      } else if (res.code == 200 || handle) {
        cb(res)
      } else if (res.code == 220) {
        this.showToast("参数错误", 'none')
      }else if (res.code == 224) {
        this.showToast("数据不存在", 'none')
      }
    }
    // 处理文件上传返回 数据
    Vue.prototype.handleFileResonse = function (res) {
      return new Promise((resolve, reject) => {
        this.handelResponse(res, resolve)
      })
    }
    // 文件上传 通讯失败
    Vue.prototype.handleFileError = function () {
      this.showToast('系统繁忙，请稍后再试', 'none')
    }
    Vue.prototype.requestGet = function (url, params) {
      return new Promise((resolve, reject) => {
        // this.$http.get(this.getUrl(url),{params:data}).then((response) => {
        //   this.handelResponse(response.data, resolve)
        // }).catch((response) => { /*  reject(response) */
        //   this.showToast('系统繁忙，请稍后再试', 'none')
        // })
        let that = this;
        let userStorage = wx.getStorageSync('user')
        if(typeof(userStorage) == String){
          userStorage = JSON.parse(wx.getStorageSync('user')?wx.getStorageSync('user'):'');
        }
        wx.request({
          url: that.getUrl(url), 
          method:"GET",
          data: Object.assign({},params),
          dataType:"json",
          header: {
            'content-type': 'application/json',// 默认值
            'token':userStorage?userStorage.token:''
          },
          success (res) {
            that.handelResponse(res.data, resolve)
          },
          fail (res){
            that.showToast('系统繁忙，请稍后再试', 'none')
          }
        })
      })
    }
    Vue.prototype.requestPost = function (url, params, config) {
      return new Promise((resolve, reject) => {
        // this.$http.post(this.getUrl(url), data, config).then((response) => {
        //   this.handelResponse(response.data, resolve)
        // }).catch((response) => { /*  reject(response) */
        //   this.showToast('系统繁忙，请稍后再试', 'none')
        // })
        let that = this
        let userStorage = wx.getStorageSync('user')
         if(typeof(userStorage) == String){
           userStorage = JSON.parse(wx.getStorageSync('user')?wx.getStorageSync('user'):'');
         }
        wx.request({
          url: that.getUrl(url), //仅为示例，并非真实的接口地址
          method:"POST",
          data: Object.assign({},params),
          dataType:"json",
          header: {
            'content-type': 'application/json',// 默认值
            'token':userStorage?userStorage.token:''
          },
          success (res) {
            that.handelResponse(res.data, resolve)
          },
          fail (res){
            that.showToast('系统繁忙，请稍后再试', 'none')
          }
        })
      })
    }
    Vue.prototype.apiGetJson = function (url, data) {//获取静态json数据
      return new Promise((resolve, reject) => {
        this.$http.get(url,{params:data}).then((response) => {
          resolve(response.data)
        }).catch((response) => { /*  reject(response) */
          this.showToast('系统繁忙，请稍后再试', 'none')
        })
      })
    }
  }
}
export default MyPlugin
