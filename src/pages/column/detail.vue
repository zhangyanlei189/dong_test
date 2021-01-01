<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-22 16:40:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="column-page">
			<view class="column-detail pd24">
				<view class="column-detail-top clearfix">
					<view class="fl">
						<view class="tit">
							{{columnInfo.title}}
						</view>
						<view class="zz">
							<image src="/static/images/timg3.jpg" mode="scaleToFill"></image>
							<text>作者:{{columnInfo.user.username}}</text>
						</view>
					</view>
					<view class="fr">
						<image :src="columnInfo.articles.author_headimg" mode="heightFix"></image>
					</view>
				</view>
				<view class="column-detail-num tc">
					<view class="column-detail-num-col">
						<view class="words">{{columnInfo.articlecount}}</view>
						<view class="words">文章</view>
					</view>
					<view class="column-detail-num-col">
						<view class="words">{{columnInfo.usercount}}</view>
						<view class="words">成员</view>
					</view>
					<view class="column-detail-num-col">
						<view class="words">{{columnInfo.questioncount}}</view>
						<view class="words">答疑</view>
					</view>
				</view>
				<view class="column-detail-box">
					<view class="column-detail-h6">
						专栏介绍
					</view>
					<view class="column-detail-intro">
						{{columnInfo.abstract}}
					</view>
					<view class="more tc">
						点击查看更多
					</view>
				</view>
				<view class="column-detail-box">
					<view class="column-detail-h6">
						专栏目录
					</view>
					<view class="column-detail-catalog">
						<view class="column-detail-catalog-li" v-for="(item,index) in columnInfo.articles"
						 :key="index">
							 <view class="num">1</view>
							 <view class="tit">{{item.title}}</view>
							 <view :class="{'sd':item.isopen != 1}" v-show="item.isopen != 1">试读</view>
						</view>
					</view>
				</view>
				<view class="column-detail-bot">
					<view class="msg">
						<text class="price">
							￥{{columnInfo.price}}
						</text>
						<text class="date">
							有效期:{{columnInfo.updatetime}}
						</text>
					</view>
					<view class="collect" @click="collect">收藏</view>
					<view class="join" @click="join">加入</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:['我加入的',"我创建的","我收藏的"],
				currentIndex:0,
				showMore:true,
				columnInfo:{},
				columnId:''
			}
		},
		onLoad(e) {
			this.columnId = e.columnId
			this.requestPost("/column/detail",{columnid:e.columnId}).then((response) => {//初始化获取详情
			console.log(response)
					this.columnInfo = response.data
				})
		},
		mounted (){
		
		},
		methods: {
			collect (){//收藏
				let that = this
				that.requestPost("/column/collect",{columnid:that.columnId}).then((response) => {
					if(response.data.status == '1'){
                        that.showToast('收藏成功','success')
                    }else{
                        that.showToast('取消收藏成功','success')
                    }

				})
			},
			join (){//加入
				that.requestPost("/column/join",{columnid:that.columnId}).then((response) => {
					if(response.data.isfree == 1){//1为免费  0为收费 收费的话需要返回订单信息
                        that.showToast('下单成功','success')
                    }else{
                        wx.navigateTo({
							url:'/pages/index/index'
						})
                    }

				})
				
			}
		}
	}
</script>

<style>

</style>
