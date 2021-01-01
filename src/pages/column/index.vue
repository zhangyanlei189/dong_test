<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-10-29 12:16:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="column-page">
			<view class="column-top">
				<text class="title-h1">我的专栏</text>
				<view class="column-tab">
					<view :class="['column-tab-li',{'act':currentIndex == index}]"
					 v-for="(item,index) in tabList" :key="index" 
					 @click="tabChange(index)">{{item}}</view>
				</view>
			</view>
			<view class="column-bottom pd24">
				<view class="column-list">
					<view class="column-li clearfix" v-for="(item,index) in columnList.lists" :key="index">
						<view class="url" @click="toColumnInfo(item.id)">
							<view class="img fl">
								<image src="/static/images/mj.jpg" mode="scaleToFill"></image>
							</view>
							<view class="content fl">
								<view class="title">
									{{item.title}}
								</view>
								<view class="msg" v-if="columnType == 1">
									<view class="price red">
										￥{{item.price}}
									</view>
									<view class="person1">
										{{item.usercount}}
									</view>
									<view class="time">
										创建时间：{{item.user.createtime}}
									</view>
								</view>
								<view class="msg" v-else>
									<view class="zz">
										作者：{{item.user.username}}
									</view>
									<view class="person">
										{{item.usercount}}
									</view>
									<view class="visit red">{{item.questioncount}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="column-bottom-btn">
					<text class="more" v-if="showMore">查看更多</text>
					<text class="none" v-else>没有更多</text>
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
				columnList:[],
				columnType:0,//判断是否为我创建的
				pages:{//分页数据
					limit:10,
					page:1
				}
			}
		},
		onLoad() {

		},
		created (){
			this.allColumn()
		},
		mounted (){
		
		},
		methods: {
			tabChange(id){//切换专栏分类
				if(id !== this.currentIndex){
					this.columnType = 0
					this.pages.page = 1;
					if(id == 0){//全部
						this.allColumn()
					}else if(id == 1){//获取我创建的专栏
						this.columnType = 1;
						this.createColumn()
					}else if(id == 2){
						this.collectColumn()
					}
				}
				this.currentIndex = id;
				if(this.pages.page <= this.columnList.total_count){//根据当前页码和总页码比较  判断当前页是否为最后一页
					this.showMore = true
				}else{
					this.showMore = false
				}
			},
			createColumn (){//我创建的
				let query = {limit:this.pages.limit,page:this.pages.page};
				this.requestPost("/column/mycreate",query).then((response) => {
					this.columnList = response.data
				})
			},
			allColumn (){//全部
				let query = {limit:this.pages.limit,page:this.pages.page};
				this.requestPost("/column/allcolumn",query).then((response) => {
					this.columnList = response.data
				})
			},
			collectColumn (){//收藏的
				let query = {limit:this.pages.limit,page:this.pages.page};
				this.requestPost("/column/allcolumn",query).then((response) => {
					this.columnList = response.data
				})
			},
			toColumnInfo (id){//跳转到专栏详情页
				wx.navigateTo({
					url:'/pages/column/detail?columnId=' + id
				})
			}
		}
	}
</script>

<style>

</style>
