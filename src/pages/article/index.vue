<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2021-01-03 09:24:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->

<template>
	<view class="app-page">
		<view class="article">
			<view class="article-tab">
				12
				<scroll-view class="article-tab-scroll" scroll-x>
					<view :class="['article-tab-li',{'act':currentTab===index}]"
					 v-for="(item,index) in tabList" :key="index"
					  @click="checkTab(index)">233
						{{item}}223300
					</view>
				</scroll-view>
				<view class="article-tab-set">
				22
					<navigator url="/pages/article/nav">|||</navigator>
					22
				</view>
			</view>
			<view class="article-content">
				<view class="article-content-li" v-for="(item,index) in articleList" :key="index">
					<view  class="url" @click="toInfo(item.columnid,item.userid)">
						<view class="title">
						{{item.title}}
					</view>
					<view class="para">
						{{item.abstract}}
					</view>
					<view class="msg">
						<view class="zz">
							<image class="img" src="/static/images/mj.jpg"></image>
							栈主：{{item.author.username}}
						</view>
						<view class="time">
							创建时间：{{item.createtime}}
						</view>
						<view class="person tr">
							{{item.author.fanscount}}
						</view>
					</view>
					</view>
					<view class="article-content-from">
						<navigator>
							<view class="article-from-title clearfix">
								<text>
								来自小栈：
								</text>
								<text>
									{{item.column_info.title}}
								</text>
								<text class="fr">
									&gt;
								</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		{{pages.page}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:["精选","云计算","大数据","应用开发","IT职业","人工智能","架构设计","自动化运维","数据治理","IT基础架构"],
				currentTab:0,//当前选中的文章类型
				pages:{
					page:1,
					limit:10
				},
				articleList:[]
			}
		},
		onLoad() {
			this.getList();
		},
		mounted (){

		},
		methods: {
			checkTab(id){//点击tab切换文章类别
				this.currentTab = id;
				this.pages.page = 12
				//wx.navigateTo({url:"/pages/common/noLogin"})
				wx.showActionSheet({
				  itemList: ['A', 'B', 'C'],
				  success (res) {
				    console.log(res.tapIndex)
				  },
				  fail (res) {
				    console.log(res.errMsg)
				  }
				})
			},
			getList (){//获取文章列表
				let query = {page:this.pages.page,limit:this.pages.limit,cateid:this.currentTab};
				this.requestGet("/article/list",query).then((response) => {
					this.articleList = response.data.lists
				})
			},
			toInfo (id,userid){//打开文章详情页
				wx.navigateTo({
					url:"/pages/article/detail?detailId=" + id + "userid=" + userid
				})
			}
		},
		onUnload() {
 		   this.pages.page = 1;
 		},
	}
</script>

<style>

</style>
