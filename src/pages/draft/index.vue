<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-29 13:27:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">122211
		<!--rich-text nodes="{{nodes}}" class="richText"></rich-text-->
		 <!-- <div class="container">
    	  	</div> -->
		<image src="/static/images/mj.jpg" @tap="bigImg" show-menu-by-longpress="true"></image>
		<button type="default" size="small" @tap="saveImg" style="z-index:9;position:relative">保存图片</button>
		<view class="collect">收藏</view>
		<view class='sendFriend'>分享到朋友圈</view>
		<button class='share' open-type="share">发送给朋友</button>
		<button open-type="getPhoneNumber" @tap="getPhone">获取手机号</button>
		<button @click='uploadImgs'>上传</button>
		<view>
			<image v-for="(item,index) in imageList" :key="index" :src='item' 
			style="width:300rpx;height:300rpx;" mode="scaleToFill" @tap='toPreviewImage' :data-id='index'></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 nodes: [{
  				 name: "h1",
  				 attrs: {
  				  style: "color:red",
  				  class: "red"
  				 },
  				 children: [{
  				  type: "text",
  				  text: '结点列表标题'
  				 }]
				  }],
				  imageList:[]
			}
		},
		onShareAppMessage(res){//转发
			console.log(res);
			if(res.from == 'button'){
				console.log("button")
			}else{
				console.log('自定义')
			}
			let sendInfo = {
    		  num: 1,
    		  nickName: "jack",
    		};    
			 return {
   			  	title: sendInfo.nickName + '向您分享了一个小程序',
				 path: '/pages/index/index?user='+sendInfo.nickName,
				 imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723703642&di=53a2a20ec48cc3359e28c082eea2b540&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150613%2Ftooopen_sy_130104869369.jpg',
				 success:()=>{
					console.log('转发成功')
				 },
				 fail:()=>{
					 console.log('转发失败')
				 }
   			}
		},
		onShareTimeline(){//分享到朋友圈
 			console.log('WebviewUrl: ', res.webviewUrl)
 			 return {
 			   title: '分享到朋友圈标题',
 			   imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723749511&di=0f3c3088320650ce122cbd21aeb3ad58&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1373169855%2C1438695195%26fm%3D214%26gp%3D0.jpg',
 			   query: 'name=ddd&age=16',
 			 }
		},
		onLoad() {

		},
		created (){

		},
		mounted (){
  
		},
		methods: {
			bigImg(){
				wx.previewImage({
				  current: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723749511&di=0f3c3088320650ce122cbd21aeb3ad58&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1373169855%2C1438695195%26fm%3D214%26gp%3D0.jpg',// 当前显示图片的http链接
				  urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723703642&di=de9579fce86cdb943bfbb7d53349655e&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130605%2F12106414_151550203383_2.jpg',
				  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723703642&di=92091067ac19bcb159d2792986e4bcc8&imgtype=0&src=http%3A%2F%2Fpic38.nipic.com%2F20140227%2F8882092_132051811000_2.jpg',
				  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723703642&di=53a2a20ec48cc3359e28c082eea2b540&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150613%2Ftooopen_sy_130104869369.jpg',
				  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603723749511&di=0f3c3088320650ce122cbd21aeb3ad58&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1373169855%2C1438695195%26fm%3D214%26gp%3D0.jpg'] // 需要预览的图片http链接列表
				})
			},
			saveImg(){
				wx.getImageInfo({//网络图片转为临时图片 保存后的路径为res.path
    			 src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601133880606&di=040139d758df0c69005b7b600bc72376&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg",
    			 success (res) {
    			   console.log(res.path);
    			   wx.saveImageToPhotosAlbum({// 保存到相册
    			     filePath:res.path,
    			     success(res) {
    			       console.log(res);
    			      }
    			   })
    			 }
			})
			},
			getPhone(option){//个人用户无权限获取手机号
				let that = this;
				wx.checkSession({
				  success () {
					//session_key 未过期，并且在本生命周期一直有效
					console.log(option)
				  },
				  fail () {
				    // session_key 已经失效，需要重新执行登录流程
					//wx.login() //重新登录
					that.loginIn()
				  }
				})
			},
			uploadImgs(){
				let that = this
				if(that.imageList.length <6){
					wx.chooseImage({
						count: 6,
						sizeType: ['original','compressed'],
						sourceType: ['album','camera'],
						success: (result)=>{
							console.log(result);
							that.imageList.push(result.tempFilePaths[0]);
							wx.uploadFile({
								url:'https://example.weixin.qq.com/upload',
								filePath:result.tempFilePaths[0],
								name:'file',
								formData:{'user':'dongbin'},
								success:(res)=>{
									  let data = res.data
        							 //do something
								}
							})
						},
						fail: ()=>{},
						complete: ()=>{}
					});
				}else{
					this.showToast('最多上传6张','none')
				}
				
			},
			toPreviewImage(option){//上传后预览图片
				let that = this;
				console.log(option)
				wx.previewImage({
					current:that.imageList[option.currentTarget.dataset.id],
					urls:that.imageList
				})
			}
		
	}
	// components: {
        //    mpvueEcharts
        //}
	}
</script>

<style>
.richText{
	display:block;
	margin:0 auto;
	width: 90%;
	height: 10vh;
	padding:10rpx;
	border:1px solid #ccc;
	border-radius: 10rpx;
}
.container {
        flex: 1;
    }
</style>