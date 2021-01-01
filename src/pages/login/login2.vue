<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-29 14:07:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="login">
			<form  @submit='submitForm'>
				 <view class="uni-form-item uni-column">
                	<view class="title" >手机号</view>
            	    <input class="uni-input" 
					maxlength="11" placeholder="最大输入长度为11" type="number" name="phone"  v-model='phone' />
            	</view>
				<view class="login-formate">
					
				</view>
				 <view class="uni-form-item uni-column">
                	<view class="title">验证码</view>
                	<input class="uni-input" maxlength="10" name='code' placeholder="最大输入长度为10" type="text"/>
					<view style="display:inline-block" @click='getCode'>
						<text v-if='showCode'>{{num==0?'请重新获取！':num+'s后重新获取'}}</text>
						<text v-else>获取验证码</text>
						</view>
            	</view>
				<view>
					<input type="text" password name='password'
					 v-model='password' placeholder="5-20位字母、数字或符号的至少两种组合的密码" @blur="fillPassword"/>
					<input type="text" password name="confirmPassWord"
					 v-model='confirmPassWord' placeholder="确认密码" @blur="fillConfirmPassWord"/>
				</view>
				<button form-type="submit">登录</button>
				<navigator url="/pages/index/index">找回密码</navigator>
			</form>
		</view>
		<div class="sleepContentView">
			<div class="circle"></div>
		</div>
	</view>
</template>

<script>
import WxValidate from '../../utils/WxValidate';
import md5 from "js-md5";
	export default {
		data() {
			return {
				 phone:'',
				 num:60,
				 showCode:false,
				 password:'',
				 confirmPassWord:''
			}
		},
		onLoad() {
			this.initValidate();//校验表单
		},
		watch:{
			'confirmPassWord':{
				handler:function(curVal,oldVal){
				console.log(curVal)
				}
			}
		},
		methods: {
 				initValidate() {
 					const rules = {
 					  phone: {
 					    required: true,
 					    tel: true,
 					  }
 					}
 					// 验证字段的提示信息，若不传则调用默认的信息
 					const messages = {
 					  phone: {
 					      required: '请输入电话号码',
 					      tel: '请输入正确的电话号码',
 					    }
 					  }
 					  // 创建实例对象
 					  this.WxValidate = new WxValidate(rules, messages)
 					  /**
 					   * 也可以自定义验证规则
 				  	 */
				 },
			 submitForm(e) {
			   /**
			    * 4-3(表单提交校验)
			    */
			   const params = e.detail.value//获取到的表单数据
			   if (!this.WxValidate.checkForm(params)) {
				 const error = this.WxValidate.errorList[0]
				 wx.showModal({
				   title: '提示',
				   content: error.msg
				 })
			      return false
			   }
			   /**
			    * 这里添写验证成功以后的逻辑
			    * 
			    */
			   //验证通过以后->
			   this.submitInfo(params);
			 },
		
			 /**
			  * 表单-提交
			  */
			 submitInfo(params) {
			   // form提交
			   let form = params;
			   console.log('将要提交的表单信息：', form);
		
			   wx.showToast({
			     title: '提交',
			   })
			 },
			 getCode(){
				 if((/^1[34578]\d{9}$/).test(this.phone)){
					 let that = this;
					 that.showCode =true
					let timer = setInterval(()=>{
						if(that.num >= 1){
							--that.num;
						}else{
							return false;
						}
					},1000)
				 }else{
					 wx.showModal({
					    title: '提示',
				   		content:'请先填写正确的手机号'
					 })
					 this.showCode = false;
				 }
			 },
			 fillPassword(){//密碼
				 if(!(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{5,20}$/).test(this.password)){
					 wx.showModal({
					    title: '提示',
				   		content:'请填写正确的密码'
					 })
				 }else if(this.confirmPassWord!==''&&this.password !== this.confirmPassWord){
					  wx.showModal({
					    title: '提示',
				   		content:'两次密码不一致'
					 })
				 }else{
					 console.log(md5(this.password),this.password)
				 }
			 },
			 fillConfirmPassWord(){//确认密码
			 	if(!(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{5,20}$/).test(this.confirmPassWord)){
					 wx.showModal({
					    title: '提示',
				   		content:'請填寫正確的确认密码'
					 })
				 }else if(this.confirmPassWord !== this.password){
						wx.showModal({
						    title: '提示',
				   			content:'两次密码不一致'
						 })						
				 }
			 }
		}
	}
</script>

<style>
	.sleepContentView{
      width:242rpx;
      height:242rpx;
      background-image: linear-gradient(#aaf0d8, #2ED) ;
      border-radius:50%;
      text-align:center;
      padding:20rpx;
      font-size:28rpx;
      box-sizing:border-box;
}
.sleepContentView .circle{
      width:100%;
      height:100%;
      background:#fff;
      border-radius:50%;
}


</style>
