<template>
  <div class="goodsDetail">
    <!--  导航栏   -->
    <detail-nav-bar/>
    <scroll class="detail-scroll"
            :probeType="3"
            ref="detailScroll"
            @scrollListen="scrollListen">
      <!--  轮播图   -->
      <detail-banner :topImages="topImages" @detailBannerImageLoad="myRefresh"/>
      <!--  商品描述信息  -->
      <detail-base-info :goods="goods"/>
      <!--  商家描述信息  -->
      <detail-shop-info :shops="shops"/>
      <!--  商品详情信息描述  -->
      <detail-commentInfo :detailInfo="detailInfo" @moreGoodsImageLoad="myRefresh"/>
    </scroll>
    <detail-main-tab-bar class="detail-main-tab-bar"/>
    <back-top v-show="isShow" @click.native="backTopClick"/>
  </div>
</template>

<script>
import { getDetail, GoodsInfo, Shop } from 'network/detail'
import { debounce } from 'common/utils'

import DetailNavBar from './childComps/DetailNavBar'
import DetailBanner from './childComps/DetailBanner'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailMainTabBar from './childComps/DetailMainTabBar'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import BackTop from 'components/content/backtop/BackTop'

export default {
  name: 'GoodsDetail',
  data () {
    return {
      id: null,
      isShow: false,
      betterSc: {},
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailBanner,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailMainTabBar,
    DetailCommentInfo,
    BackTop
  },
  created () {
    //  1、保存传入的id
    this.id = this.$route.params.id

    //  2、请求数据
    getDetail(this.id).then(res => {
      const datas = res.data.result
      //  1、获取顶部的图片
      this.topImages = datas.itemInfo.topImages
      //  2、获取商品信息
      this.goods = new GoodsInfo(datas.itemInfo, datas.columns, datas.shopInfo)
      //  3、获取商家信息
      this.shops = new Shop(datas.shopInfo)
      //  4、获取商品详情信息
      this.detailInfo = datas.detailInfo
      console.log(datas)
    })
  },
  methods: {
    /*  刷新滚动高度函数  */
    myRefresh () {
      this.$refs.detailScroll.reCalculate()
    },
    refreshScrollHeight () {},
    /*  监听滚动距离显示返回顶部图标  */
    scrollListen () {
      if (-this.betterSc.y >= 1000) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    /*  点击backTop返回顶部 */
    backTopClick () {
      this.$refs.detailScroll.scrollTo(0, 50, 1000)
    }
  },
  mounted () {
    //  1、刷新betterScroll高度防抖封装
    this.refreshScrollHeight = debounce(this.myRefresh, 500)
    //  2、获得betterScroll组件的对象
    this.betterSc = this.$refs.detailScroll.bs
  }
}
</script>

<style lang="less" scoped>
  .goodsDetail {
    background-color: #ffffff;
    height: 100vh;

    .detail-scroll {
      height: calc(100% - 93px);
    }

    .detail-main-tab-bar {
      position: relative;
      z-index: 12;
      width: 60px;
      background-color: #f00;
    }
  }
</style>
