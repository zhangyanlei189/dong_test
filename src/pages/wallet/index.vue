<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-26 11:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="wallet-page">
			我的钱包
			<view class="title-h1">
				我的入账
			</view>
			<view class="number clearfix tc">
				<view style="width:30%;margin-right:10rpx">可提现金额</view>
				<view style="width:30%">已结算金额</view>
			</view>
			<view class="tx" 
			style="width:160rpx;height:40rpx;line-height:40rpx;text-align:center;background:#ab2203;color:#fff"
			>提现</view>
			<view>收藏</view>
			<view>分享</view>
			<view>发送给朋友</view>
			<view>分享到朋友圈</view>
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
		margin: 0 10rpx;
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
