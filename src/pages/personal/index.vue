<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-11-10 21:46:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="personal-page pd24">
			<view class="personal-top">
				<image src="/static/images/weidenglu@2x.png" class="img" mode="widthFix"></image>
				<view class="userName tc" v-if="loginStatus">
					<input type='text' maxlength=6 focus confirm-type='完成' v-if="modifyBtn" v-model="nickName"
					 @confirm="modifyName" @blur="modifyName"/>
					<text v-else>{{userInfo.nickname}}</text>
					<view style="display:inline-block" @click='modify'>修改</view>
					<view>{{this.$store.state.userInfo.nickname}}</view>
				</view>
				<view class="btn" @click="toLogin" v-else>立即登录</view>
			</view>
			<view class="personal-num tc">
				<view class="personal-num-col">
					<text class="num">
						{{loginStatus?userInfo.fansnum:0}}
					</text>
					<text class="text">
						记录
					</text>
				</view>
				<view class="personal-num-col">
					<text class="num">
						{{loginStatus?userInfo.focusnum:0}}
					</text>
					<text class="text">
						关注
					</text>
				</view>
				<view class="personal-num-col">
					<text class="num">
						{{loginStatus?userInfo.fanscount:0}}
					</text>
					<text class="text">
						粉丝
					</text>
				</view>
			</view>
			<view class="personal-list">
				<view class="personal-li">
					<navigator url="/pages/column/index" class="url">
						<view class="img">
							<view class="outer">
								<image src="/static/images/icon-zhuanlan@2x.png" style="width:56rpx;height:42rpx;" mode="scalToFill"></image>
							</view>
						</view>
						<view class="tit">
							我的小栈
						</view>
						<view class="num"></view>
						<view class="go">&gt;</view>
					</navigator>
				</view>
				<view class="personal-li">
					<navigator url="/pages/column/index" class="url">
						<view class="img">
							<view class="outer">
								<image src="/static/images/icon_wodezhuanlan@2x.png" style="width:56rpx;height:40rpx;" mode="scalToFill"></image>
							</view>
						</view>
						<view class="tit">
							我的专栏
						</view>
						<view class="num"></view>
						<view class="go">&gt;</view>
					</navigator>
				</view>
				<view class="personal-li" style="border-bottom:2rpx solid #f5f5f5">
					<navigator url="/pages/article/index" class="url">
						<view class="img">
							<view class="outer">
								<image src="/static/images/icon_shouye_wodewenzhang@2x.png" style="width:50rpx;height:40rpx;" mode="scalToFill"></image>
							</view>
						</view>
						<view class="tit">
							我的文章
						</view>
						<view class="num"></view>
						<view class="go">&gt;</view>
					</navigator>
				</view>
				<view class="personal-li">
					<navigator url="/pages/wallet/index" class="url">
						<view class="img">
							<view class="outer">
								<image src="/static/images/icon_qianbao@2x.png" style="width:36rpx;height:36rpx;" mode="scalToFill"></image>
							</view>
						</view>
						<view class="tit">
							钱包
						</view>
						<view class="num"></view>
						<view class="go">&gt;</view>
					</navigator>
				</view>
				<view class="personal-li">
					<navigator url="/pages/draft/index" class="url">
						<view class="img">
							<view class="outer">
								<image src="/static/images/icon_caogao@2x.png" style="width:36rpx;height:36rpx;" mode="scalToFill"></image>
							</view>
						</view>
						<view class="tit">
							草稿
						</view>
						<view class="num">2</view>
						<view class="go">&gt;</view>
					</navigator>
				</view>
				<view class="personal-li" v-show="loginStatus">
					<view class="img">
							<view class="outer">
								<image src="/static/images/icon_tuichu@2x.png" style="width:36rpx;height:36rpx;" mode="scalToFill"></image>
							</view>
						</view>
						<button open-type='exit' target="miniProgram" @click="exit">退出</button>
				</view>
			</view>
		</view>
		<loginBox v-if="loginDialog" :loginDialog="loginDialog"  
		@change="setDialogChange" v-on:listenFromChild="loginSuc"></loginBox>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
 import loginBox from '@/pages/common/popup.vue'
	export default {
		data() {
			return {
				loginDialog: false,// 登录
				userInfo:{},
				loginStatus:false,//登录状态
				modifyBtn:false,//修改用户名文本框显示状态
				nickName:''//修改后的昵称
			}
		},
		onLoad() {

		},
		onShow(){
			
		},
		mounted(){
			this.setUser()
		},
		onTabItemTap(item) {
 		   console.log(item,111)
		  },
		computed: {
 		  ...mapState({
 		    info: function (state) {
 		      return state.userInfo
 		    }
 		  })
 		},
		methods: {
			toLogin(){//显示登录弹框
				this.loginDialog = true;
			},
			setDialogChange (dialog) {
        		this.loginDialog = dialog
			  },
			  loginSuc (res){
				  console.log(111111,res)
				  this.loginDialog = false
				  this.setUser()
			  },
			  getUserInfo (res){
				  console.log(res)
			  },
			  setUser(){//登录成功后把用户信息同步到页面
					let user = wx.getStorageSync('user');
					if(user !=='' && user !== undefined && user !== null){
						if(typeof(user) == 'string'){
							user = JSON.parse(user);
						}
						this.loginStatus = true;
					}else{
						user = {}
						this.loginStatus = false;
					}
					this.userInfo = user;
			},
			modify (){//点击修改按钮，控制修改用户名文本框显示状态
				this.modifyBtn =!this.modifyBtn
			},
			modifyName (){//修改用户名文本框 提交事件
				let that = this
				this.requestPost("/column/collect",{nickname:that.nickName}).then((response)=>{
					console.log(response)
					if(response.code == 200){
						that.showToast('更改成功','success');
						that.userInfo.nickname = that.nickName;
						wx.setStorageSync({
							'user':JSON.stringify(that.userInfo)
						});
						wx.setStorage({
							key:'user',
							data:JSON.stringify(that.userInfo),
							success:()=>{
								this.modifyBtn =!this.modifyBtn
							}
						})
					}
				})
			},
			exit(){
				wx.removeStorage({
					key: 'user',
					success: (result)=>{
						console.log(result);
						this.loginStatus = false;
					},
					fail: ()=>{},
					complete: ()=>{}
				});
			}
			  
		},
		components:{
			loginBox
		}
	}
</script>

<style>
	
</style>
