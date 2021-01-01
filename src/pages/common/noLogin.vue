<!--
 * @Author: your name
 * @Date: 2020-10-24 11:11:50
 * @LastEditTime: 2020-10-29 09:48:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\front\src\pages\common\emptyLogin.vue
-->
<template>
    <view>
        <loginBox   
		@change="setDialogChange" v-on:listenFromChild="loginSuc"></loginBox>
    </view>
</template>
<script>
 import loginBox from '@/pages/common/popupN.vue'
	export default {
		data() {
			return {
				loginDialog: false,// 登录
			}
		},
		onLoad(option) {
			
		},
		onShow(){
			
		},
		onTabItemTap(item) {
 		   console.log(item,111)
 		 },
		methods: {
			// setDialogChange (dialog) {
        	// 	this.loginDialog = dialog
			//   },
			//   loginSuc (res){
			// 	  console.log(111111,res)
			// 	  this.loginDialog = false
			//   }
			  
		},
		components:{
			loginBox
		}
    }
    </script>