<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-29 10:41:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="loginModel zan-dialog zan-dialog-show">
        <view class="zan-dialog__mask" @click="toggleDialog" />
        <view :class="['zan-dialog__container',{'animate-out':outAnimate}]">
             <view class="login-img">
                 <image src="/static/images/denglutu@2x.png" mode="scaleToFill"></image>
             </view>
             <view class="login-h1 tc">
                 登录一下
             </view>
             <view class="login-text tc">
                 请先登录再进行操作
             </view>
             <view class="login-buttons tc">
                 <button class="login-weixin"  open-type='getUserInfo'
                  @getuserinfo="wxLogin">微信授权</button>
                 <view class="login-other" @click="otherToLogin">其他方式</view>
             </view>
             <view class="login-no tc" @click="toggleDialog">暂不登录</view>
           </view>
      </view>
</template>

<script>
import {circle} from '@/common/httpN'
	export default {
         props: {
         },
		data() {
			return {
                outAnimate:true,
                routeFrom:''//获取登录页的前一个路由信息，登录成功后返回该路由
			}
		},
		created ()  {
  
        },
        mounted (){
            let curPages =  getCurrentPages();//获取当前路由栈
            this.routeFrom = (curPages[curPages.length-2]).is;
            if((wx.getStorageSync('user')).length>0){//已经是登录状态，则直接返回之前路由
                circle.navigateTo(this.routeFrom)
            }
        },
		methods: {
            toggleDialog() {//关闭弹框
                 this.outAnimate = !this.outAnimate;
            },
            otherToLogin (){//其他方式登录
                wx.navigateTo({url:"/pages/login/login1"})
            },
            wxLogin () {//微信登录
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
                                     console.log(res,'suc');
                                   if(res.code == 200){
                                     wx.setStorage({//把用户信息存到storage
                                       key:'user',
                                       data:JSON.stringify(res.data.data),
                                       success:()=>{
                                        wx.hideLoading();
                                       // that.$emit('listenFromChild','close');
                                       circle.navigateTo(that.routeFrom)//登录成功后返回路由页
                                       }
                                     })
                                     
                                   }else{
                                     wx.hideLoading();
                                     circle.showToast("请稍后重试！",'none')
                                   }
                                 },
                                 fail: (res)=>{
                                     console.log(res,'fail')
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
            wxLogin (param){
                this.loginIn();
            }
            
        }
	}
</script>

<style>
.zan-dialog__mask {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, .5);
  display:none
}
.zan-dialog__container {
  position: fixed;
  top: 160rpx;
  width: 622rpx;
  height: 764rpx;
  margin-left: 50rpx;
  background: #f8f8f8;
  transform: translateY(300%);
  transition: all 0.4s ease;
  z-index: 12;
  border-radius: 20rpx;
}
.zan-dialog-show .zan-dialog__container {
  transform: translateY(0);
}
.zan-dialog-show .zan-dialog__container.outAnimate{
    animation: outDown .3s;
}
.zan-dialog-show .zan-dialog__mask {
  display: block;
}
@keyframes outDown {
    0%{
        transform: translateY(0);
    }
    100%{
        transform: translateY(300%);
    }
}
.login-img{
    width: 100%;
    height: 354rpx;
}
.login-img image{
    width: 100%;
    height: 100%;
}
.login-h1{
    margin:52rpx auto 40rpx;
    font-size: 46rpx;
    color: #131313;
    line-height: 23px;
}
.login-text{
    font-size: 32rpx;
    color: #999;
}
.login-buttons{
    margin:60rpx auto 30rpx;
}
.login-weixin,.login-other{
    display: inline-block;
    width: 250rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 32rpx;
    border-radius: 10rpx;
    vertical-align: middle;
}
.login-weixin{
    margin-right: 26rpx;
    background: #45ACF3;
    color: #fff;
}
.login-other{
    border:1px solid #666;
    color: #666;
}
.login-no{
    font-size: 24rpx;
    color: #999;
}
</style>
