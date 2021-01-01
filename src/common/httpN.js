/*
 * @Author: your name
 * @Date: 2020-10-22 10:49:17
 * @LastEditTime: 2020-10-30 09:57:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\common\http.js
 */

import config from '@/common/config'
export const circle = {
  // 处理url
  getUrl:function (url){
    let getUrl = config.mockUrl + url
    return getUrl
  },
//消息提示框
  showToast:function (info, iconType, myCustomClass){
    wx.showToast({
      title: info,
      icon: iconType,
      duration: 1000
    })
  },
  //处理空字符串
  emptiness:function(str){
    if(str == null || str == undefined || str == ''){
      return ''
    }else{
      return str
    }
  },
  //登录
  loginIn:function(){
  let that = this;
  wx.showLoading();
  let user = {};
  wx.login({
    success (res) {
      if (res.code) {
        //发起网络请求
        user.code = res.code
        wx.getUserInfo({
          withCredentials: 'false',
          success: (result)=>{
            user.encryptedData = result.encryptedData;
            user.iv =  result.iv;
            wx.request({
              url: circle.getUrl('/user/wxlogin'),
              data: user,
              success (res){
                if(res.code == 200){
                  wx.setStorage({//把用户信息存到storage
                    key:'user',
                    data:JSON.stringify(res.data.data),
                    success:()=>{
                     wx.hideLoading();
                     that.$emit('listenFromChild','close');
                    }
                  })
                }else{
                  wx.hideLoading();
                  circle.showToast("请稍后重试！",'none')
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
      circle.showToast('系统繁忙！','none')
    }
  })
  },
  //登录失败
  loginFailure:function(file) {
    circle.showToast('登录失效，请重新登录', 'error')
    let t = null
    clearTimeout(t)
    t = setTimeout(() => {
    /*  this.$router.push('/login')
      location.reload() // 主要是重新注入路由实例 */
    //  window.open(`${config.loginUrl}sso/login?redirect=${window.location.href}`, '_self')
      // wx.navigateTo({
      //   url:'/pages/index/index1'
      // })
      circle.loginIn();
    }, 1000)
  },
  // 处理返回数据 handle 为true时，组件自己处理返回数据
  handelResponse:function(res, cb, handle) {
    if (res.code == 2) { // 半小时不操作，返回登录页
      circle.loginFailure()
    } else if (res.code == 200 || handle) {
      cb(res)
    } else if (res.code == 220) {
      circle.showToast("参数错误", 'none')
    }else if (res.code == 224) {
      circle.showToast("数据不存在", 'none')
    }
  },
  //处理文件上传返回 数据
  handleFileResonse:function(res) {
    return new Promise((resolve, reject) => {
      circle.handelResponse(res, resolve)
    })
  },
  // 文件上传 通讯失败
  handleFileError:function() {
    circle.showToast('系统繁忙，请稍后再试', 'none')
  },
  //get请求
  requestGet:function(url, params) {
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
        url:circle.getUrl(url), //仅为示例，并非真实的接口地址
        method:"GET",
        data: Object.assign({},params),
        dataType:"json",
        header: {
          'content-type': 'application/json',// 默认值
          'token':userStorage?userStorage.token:''
        },
        success (res) {
          circle.handelResponse(res.data, resolve)
        },
        fail (res){
          circle.showToast('系统繁忙，请稍后再试', 'none')
        }
      })
    })
  },
  //post请求
  requestPost:function(url, params, config) {
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
        url: circle.getUrl(url), //仅为示例，并非真实的接口地址
        method:"POST",
        data: Object.assign({},params),
        dataType:"json",
        header: {
          'content-type': 'application/json',// 默认值
          'token':userStorage?userStorage.token:''
        },
        success (res) {
          circle.handelResponse(res.data, resolve)
        },
        fail (res){
          circle.showToast('系统繁忙，请稍后再试', 'none')
        }
      })
    })
  },
  apiGetJson:function(url, data) {//获取静态json数据
    return new Promise((resolve, reject) => {
      circle.requestGet(url,{params:data}).then((response) => {
        resolve(response.data)
      }).catch((response) => { /*  reject(response) */
        circle.showToast('系统繁忙，请稍后再试', 'none')
      })
    })
  },
  formatTime:function(date) {
    date = typeof datetime == 'string' ? new Date(datetime.replace(/-/g, "/")) : date;
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('-')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
  },
  navigateTo:function(url){
    url:url
  }
}
export const html = {
  decode(html) {
      return html
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&");
  },
  encode(html) {
      return html
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
          .replace(/ /g, "&nbsp;")
          .replace(/&/g, "&amp;");
  }
}
