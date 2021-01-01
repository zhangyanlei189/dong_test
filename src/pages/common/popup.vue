<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-30 10:08:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view :class="dialogclass">
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
                  @getuserinfo="loginnn">微信授权</button>
                 <view class="login-other" @click="otherToLogin">其他方式</view>
             </view>
             <view class="login-no tc" @click="toggleDialog">暂不登录</view>
           </view>
      </view>
</template>

<script>
	export default {
         props: {
              loginDialog: {
                type: Boolean,
                default: false
              }
         },
		data() {
			return {
                showDialog: this.loginDialog,
                dialogclass: 'zan-dialog',
                outAnimate:false
			}
		},
		created ()  {
  
        },
        mounted (){
            this.dialogclass = (this.showDialog) ? 'loginModel zan-dialog zan-dialog-show' : 'zan-dialog';
        },
		methods: {
            toggleDialog() {//关闭弹框
                 this.outAnimate = !this.outAnimate;
                 this.showDialog = !this.showDialog;
                 this.$emit('change', this.showDialog);
            },
            otherToLogin (){//其他方式登录
                wx.navigateTo({url:"/pages/login/login1"})
            },
            login () {
                //this.loginIn();
            },
            loginnn (param){
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
