<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-21 12:31:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="article-nav">
			<view class="close" @click="reBackArticle">X</view>
			<view class="article-nav-list">
				<view class="title-h2">
					我的频道
				</view>
				<view class="article-nav-li" v-for="(item,index) in navList" :key="index">
					<text>{{item}}</text>
					<view class="delete red" @click="del(index)">X</view>
				</view>
			</view>
			<view class="article-nav-list">
				<view class="title-h2">
					其他频道推荐
				</view>
				<view class="article-nav-li" v-for="(item,index) in navList1" :key="index" @click="add(index)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:["云计算","大数据","应用开发","IT职业","人工智能","架构设计","自动化运维"],
				navList1:["云计算1","大数据1","应用开发1","IT职业1","人工智能1","架构设计1","自动化运维1"]
			}
		},
		onLoad() {

		},
		mounted (){
			
		},
		methods: {
			del (id) {//删除导航
				this.navList1.push(this.navList[id])
				this.navList.splice(id,1);
			},
			reBackArticle () {//返回我的文章页
				wx.navigateBack()
			},
			add (id) {
				this.navList.push(this.navList1[id])
				this.navList1.splice(id,1);
			}
		}
	}
</script>

<style>

</style>
