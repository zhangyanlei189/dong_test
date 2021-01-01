<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-11-14 14:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view>
			 <swiper class="index-swiper" 
			 :indicator-dots="indicatorDots"
			  :autoplay="autoplay" 
			  :interval="interval" 
			  :duration="duration"
			  previous-margin="60rpx"
			  next-margin="60rpx"
			  circular="true"
			  >
                  <swiper-item v-for="(item,index) in bannerList" :key="item.id"  class="swiper-item">
                     <image :src="item.path" mode='scaleToFill'></image>
                  </swiper-item>
              </swiper>
			   <view class="pd24">
				  <scroll-view class="tab-scroll" scroll-x="true" paging-enabled="true">
					  <view class="tab-scroll-li">
						  <navigator url="/pages/column/index" class="url">
						 	 我的小栈
						  </navigator>
						  </view>
					  <view class="tab-scroll-li">
						   <navigator url="/pages/article/index" class="url">
						 	 我的文章
						  </navigator> 
					  </view>
					  <view class="tab-scroll-li">
						  <navigator url="/pages/column/index" class="url">
						 	 我的专区
						  </navigator>
					  </view>
				  </scroll-view>	
				 <view class="title-h2 clearfix">
					 <text>技术小栈</text>
					 <navigator url="/pages/index" class="fr more">更多&gt;</navigator>
				 </view>
				 <view class="technology-list">
					 <view class="technology-li">
						 <navigator class="navigator clearfix">
							 <view class="fl img">
								 <image src="/static/images/mj.jpg" mode="scaleToFill"></image>
							 </view>
							 <view class="fl msg">
								<view class="title">开源数据库学习与研究</view>
								<view class="para">
									专注PostgreSQL、Greenplum以及MySQL
								</view>
								<view class="bot">
									<text class="price">￥66.6</text>
									<text class="zz">栈主:yzs87</text>
									<text class="visit">12</text>
								</view>
							 </view>
						 </navigator>
					 </view>					 
				 </view>
				 <view class="title-h2 clearfix">
					 <text>热门专栏</text>
					 <navigator url="/pages/index" class="fr more">更多&gt;</navigator>
				 </view>
				 <view class="hot-column clearfix">
					 <view class="hot-column-li fl" v-for="(item,index) in hotColumn" :key="index">
						<navigator class="url">
							<view class="img">
								<image :src="item.thumb" mode="scaleToFill" lazy-load></image>
							</view>
							<view class="msg">
								<view class="title">{{item.title}}</view>
								<view class="bot clearfix">
									<text class="price">￥{{item.price}}</text>
									<text class="zz fr">作者:{{item.master.username}}</text>
								</view>
							 </view>
						</navigator>
					 </view>
				 </view>
				 <view v-show="noMore">没有更多</view>
			   </view>
		</view>
	</view>
</template>

<script>
import  {circle} from '@/common/httpN'
	export default {
		data() {
			return {
				 indicatorDots: true,
           		 autoplay: false,
           		 interval: 2000,
				 duration: 500,
				 bannerList:[],
				 hotColumn:[],
				 pages:{
					 limit:4,
					 page:1
				 },
				 noMore:false
			}
		},	
		onLoad(option) {//在draft/index中分享的index/index页面，此处的option.user为draft/index中传的sendInfo.nickName
			console.log(option)
		},
		created (){
			this.getBanner();
			this.getHotColumn()
		},
		mounted (){
  
		},
		methods: {
			getBanner (){
				// wx.request({
				// 	url: 'http://localhost:3000/api.php/app/banner/list',
				// 	data: {},
				// 	header: {'content-type':'application/json'},
				// 	method: 'GET',
				// 	dataType: 'json',
				// 	responseType: 'text',
				// 	success: (result)=>{
				// 		console.log(result)
				// 	},
				// 	fail: (res)=>{
				// 		console.log(res)
				// 	},
				// 	complete: ()=>{}
				// });
				circle.requestGet("/banner/list").then((response) => {
       			 	this.bannerList = response.data;
       			})
			},
			getHotColumn (){//获取热门专栏
				circle.requestGet("/column/hotcolumn",this.pages).then((response) => {
					if(response.data.lists.length > 0){
						this.noMore = false;
						this.hotColumn = this.hotColumn.concat(response.data.lists);
					}else{
						this.noMore = true;
					}
       			})
			}
		},
		onReachBottom (){//上滑获取更多
			let that = this;
			++that.pages.page;
			that.getHotColumn()
		}
	}
</script>

<style>
	.index-swiper{
		height:250rpx;
	}
	.index-swiper .swiper-item,.index-swiper .swiper-item image {
		width:630rpx;
		-webkit-border-radius:10px;
		border-radius:10px;
	}
	.index-swiper .swiper-item image{
		width: 630rpx;
		height: 250rpx;
	}
	.index-swiper .swiper-item{
		padding: 0 10rpx;
		height:100%;
	}
	.tab-scroll{
		margin:30rpx auto 40rpx;
		height: 130rpx;
		width: 100%;
		white-space: nowrap;
	}
	.tab-scroll-li{
		display: inline-block;
		margin-right: 18rpx;
		width: 296rpx!important;
		height: 120rpx!important;
		background: #ddd;
		border-radius: 12px;
		line-height: 120rpx;
		text-align: center;
		color: #131313;
		font-size: 32rpx;
	}
</style>
