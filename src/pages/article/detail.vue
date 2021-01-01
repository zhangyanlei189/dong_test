<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2021-01-01 10:06:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
	<view class="app-page">
		<view class="article-detail">
			<view class="top pd24">
				<view class="title-h1">
					{{detailInfo.title}}1012211
				</view>
				<view class="msg"> 
					<view class="zz">12211
						<image class="img" :src="detailInfo.author.headimg"></image>
						{{detailInfo.author.username}}
					</view>
					<view class="time">
						创建时间：{{detailInfo.author.createtime}}
					</view>
					<view class="person tr">
						{{detailInfo.author.fanscount}}
					</view>
				</view>	
			</view>
			<view class="middle">
				<view class="para pd24">
					{{detailInfo.abstract}}
				</view>	
				<view class="support-msg pd24">
					<view class="img">
						<image src="/static/images/icon-dianzan.png" mode="widthFix"></image>
					</view>
					<view v-for="(item,index) in support" :key="index" class="support-msg-text">
						<text v-show="index!==0">,</text>{{item}}
					</view>等{{supportTotal}}人觉得很赞
				</view>
				<view class="comment">
					<view class="comment-title">
						评论({{detailInfo.commentcount}})
					</view>
					<view class="comment-list">
						<view class="comment-li" v-for="(item,index) in commentList" :key="index">
							<view class="img">
								<image src="/static/images/mj.jpg" mode="widthFix"></image>
							</view>
							<view class="msg">
								<view class="name">
									{{item.user.nickname}}
								</view>
								<view class="time">
										{{item.createtime}}
								</view>
								<view class="list">
									<view class="para para1">
										{{item.content}}
									</view>
									<view class="para para2" v-for="(item1,index) in item.comments" :key="index">
										<text class="user1">{{item1.pub_user_name.nickname}}</text>
										<text class="reply">回复</text>
										<text class="user2">{{item1.pub_user_name.username}}</text>：
										{{item1.content}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bot">
				 <textarea placeholder="我来说几句" placeholder-style="color:999;"  maxlength=10
				 @confirm="toComment" @blur="toComment" v-model="commentContent"/>
				<view class="img" @click="praise">
					<image src="/static/images/icon-dianzan2.png" mode="widthFix"></image>
				</view>
				<view class="img" @click="collect">
					<image src="/static/images/icon-dianzan2.png" mode="widthFix"></image>
				</view>
				<view class="img">
					<image src="/static/images/icon-dianzan2.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				support:['111','222','333','444','555','666','777','888'],
				supportTotal:0,
				detailInfo:{},//文章详情
				commentList:[],//评论列表
				commentContent:''
			}
		},
		onLoad(e) {
			this.getDetail(e);
			this.getCommentList();
		},
		mounted (){
			this.supportTotal = this.support.length
		},
		methods: { //@click="praise(detaileInfo.userid,detailInfo.author.id)"
			getDetail(e){//获取用户详情
				let query = {articleid:e.detailId,userid:e.userid}
				this.requestGet('/article/detail',query).then((response) => {
					this.detailInfo = response.data[0];
				})
			},
			getCommentList(){//获取评论列表
				wx.request({
					url:'http://dev.api.z.itpub.net/stack/dynamiclist',
					 method:"GET",
         			 data: {stackid:10058,limit:10},
         			 dataType:"json",
         			 header: {
         			   'content-type': 'application/json'
         			 },
					success:(response)=>{
						console.log(response)
						this.commentList = response.data.data.lists
					},
					fail:(err)=>{
						console.log(222,err)
					}
				})
			},
			praise () {//点赞
				let query = {publish_userid:this.detailInfo.author.id,articleid:this.detailInfo.userid}
				this.requestGet('/article/praise').then((response) => {
					if(response.status == 1){
						this.showToast('点赞成功','success')
					}else{
						this.showToast('取消点赞成功','success')
					}
				})
			},
			collect () {//收藏
				let query = {publish_userid:this.detailInfo.author.id,articleid:this.detailInfo.userid}
				this.requestGet('/article/collect',query).then((response) => {
					if(response.status == 1){
						this.showToast('收藏成功','success')
					}else{
						this.showToast('取消收藏成功','success')
					}
				})
			},
			toComment (){//发表评论
				let that = this;
				that.requestGet('/column/hotcolumn',{comment:this.commentContent}).then((response) => {
					if(response.code == 200){
						that.showToast('评论成功！','success');
						that.commentContent = '';
						that.getCommentList();
					}
				})
			}
		}
	}
</script>

<style>

</style>
