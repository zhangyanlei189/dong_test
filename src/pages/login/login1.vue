<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-29 14:00:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="login">
			<form>
				 <view class="uni-form-item uni-column">
                	<view class="title">用户名</view>
            	    <input class="uni-input" maxlength="10" placeholder="最大输入长度为10" type="text" />
            	</view>
				 <view class="uni-form-item uni-column">
                	<view class="title">密码</view>
                	<input class="uni-input" maxlength="10" placeholder="最大输入长度为10" password="true" type="text"/>
            	</view>
				<button form-type="submit ">登录</button>
				<navigator url="/pages/index/index">找回密码</navigator>
			</form>
			<navigator url="/pages/login/login2">手机号登录</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
 
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
