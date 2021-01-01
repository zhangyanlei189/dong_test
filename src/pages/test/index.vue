<!--
 * @Author: your name
 * @Date: 2020-10-19 15:13:25
 * @LastEditTime: 2020-11-14 14:18:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ithub-mobile\src\pages\index\index.vue
-->
<template>
<view class="content bofeducation-wrapper">
    <view class="index-top">
        <view class="title">
            {{educationBureauName}}
        </view>
        <view class="news">
            <Icon iconType="iconxiangyou" iconColor="#2EB9FE" iconSize="24"></Icon>
        </view>
    </view>
    <view class="index-banner">
        <!--<swiper class="index-swiper" vertical="{{autoplay}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
            <swiper-item wx:for="bannerList" wx:key="{{id}}" class="swiper-item">
                <image src="{{path}}" mode="scaleToFill"></image>
            </swiper-item>
        </swiper>-->
        <swiper class="index-swiper" vertical="{{vertical}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="{{circular}}" wx:if="{{bannerListLength>0}}">
            <swiper-item class="swiper-item" wx:for="bannerList" wx:key='index'>
                <image src="{{item.image}}" mode="scaleToFill"></image>
                <view class="bot">
                    <view class="msg">
                        {{item.schoolName}}
                    </view>
                    <view class="num">
                        {{index}}/{{bannerListLength}}
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>
    <view class="index-work-report">
        <view class="name">
            工作日报
        </view>
        <view class="explain">
            {{workDate}}食堂台账完成率{{ledgerRate}}
        </view>
        <view class="icon-right">
            <Icon1 iconType="iconxiangyou" iconColor="#888888" iconSize="24" />
        </view>
    </view>
    <view class="index-menu">
        <view class="item" wx:for="{{menuList}}" wx:key='index' bindtap="goMenu({{item.navigateUrl}})">
            <!--wx:for-index="index" wx:for-item="item"-->
            <image class="item_icon" src="{{item.imgPath}}" />
            <view class="item_text ">{{item.text}}</view>
        </view>
        <!--<view class="item">
            <image class="item_icon" src="../../images/cgrtz.png" />
            <view class="item_text ">食谱管理</view>
        </view>
        <view class="item">
            <image class="item_icon" src="../../images/cgrtz.png" />
            <view class="item_text ">台账管理</view>
        </view>
        <view class="item">
            <image class="item_icon" src="../../images/cgrtz.png" />
            <view class="item_text ">采购管理</view>
        </view> 
        <view class="item">
            <image class="item_icon" src="../../images/cgrtz.png" />
            <view class="item_text ">食堂评分</view>
        </view>
        <view class="item">
            <image class="item_icon" src="../../images/cgrtz.png" />
            <view class="item_text ">学校管理</view>
        </view>
        <view class="item">
            <image class="item_icon" src="../../images/cgrtz.png" />
            <view class="item_text ">供应商管理</view>
        </view>-->
    </view>
    <view class="login-button" bindtap="clickExitLogin">
        退出登录
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
			//this.getBanner();
			//this.getHotColumn()
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

<style lang="less">
@color:#2EB9FE;//主色调
@deleteColor:#E64340;//删除
@viceColor:#09BB07; //辅助颜色
@borderColor:#e3e3e3;//边框颜色
@fontColor:#353535; //文字 标题 内容
@subtitleColor:#666666; //子内容（比如描述 子标题）
@whiteColor:#ffffff; //白色
@greyColor:#999999; //灰色
@buttonDefault:#f5f5f5;//多选按钮默认颜色
@buttonActive:#2EB9FE;//多选按钮选中颜色
@inputColor:#0079B5;


@titleSize:unit(40,rpx); //标题
@contentSize:unit(34,rpx); //内容
@childSize:unit(28,rpx);  //子内容 搜索
@subSize:unit(24,rpx); //子标题24
.clearfix {
    zoom: 1; 
}
  
.clearfix:after {
  content: ".";
  width: 0;
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
  overflow: hidden; 
}
.floatL{
    float: left;
}
.index-top {
    display: flex;
    padding: 0 40rpx 0 32rpx;
    height: 100rpx;
    line-height: 100rpx;

    .title {
        flex: 5;
        -webkit-flex: 5;
        font-size: @titleSize;
        font-weight: 400;
        color: @fontColor;
    }

    .news {
        flex: 1;
        -webkit-flex: 1;
        text-align: right;
        height: 100%;
    }
}

.index-banner {
    .swiper-item {
        position: relative;
        width: 100%;
        height: 400px;

        image {
            width: 100%;
            height: 100%;
        }

        .bot {
            padding-left: 22rpx;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            background: rgba(0, 0, 0, .5);
            z-index: 9;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;

            .msg {
                width: 80%;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: @subSize;
                overflow: hidden;
                color: @whiteColor
            }

            .num {
                position: absolute;
                right: 12rpx;
                top: 0;
                font-size: @contentSize;
                color: @greyColor
            }
        }
    }
}

.index-work-report {
    padding: 0 32rpx;
    display: flex;
    justify-content: space-between;
    width: 100%;
    line-height: 104rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .name {
        flex: 2;
        -webkit-flex: 2;
        font-size: @contentSize;
    }

    .explain {
        flex: 6;
        -webkit-flex: 6;
        font-size: @childSize;
        color: @greyColor;
    }

    .icon-right {
        flex: 1;
        -webkit-flex: 1;
        color: @greyColor;
    }
}

.index-menu {
    display: flex;
    padding: 50rpx 64rpx;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex-wrap: wrap;

    .item {
        flex: 1;
        -webkit-flex: 1;
        font-size: @childSize;
        max-width: 33.3%;
        min-width: 33.3%;
        text-align: center;
        margin-bottom: 64rpx;

        .item_icon {
            margin-bottom: 4rpx;
            width: 90rpx;
            height: 90rpx;
        }

        .item_text {
            font-size: @childSize;
        }
    }
}

.login-button {
    margin: 0 auto;
    width: 146rpx;
    height: 60rpx;
    line-height: 58rpx;
    text-align: center;
    font-size: @childSize;
    color: @fontColor;
    border: 2rpx solid #888;
    -webkit-border-radius: 10rpx;
    border-radius: 10rpx;
}
</style>
