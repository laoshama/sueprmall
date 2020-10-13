<template>
  <div class="goodsDetail">
    <!--  导航栏   -->
    <detail-nav-bar ref="detail-nav-bar" @titleClick="titleClick"/>
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
      <!--  商品详情信息  -->
      <detail-commentInfo ref="detailInfo" :detailInfo="detailInfo" @moreGoodsImageLoad="myRefresh"/>
      <!--  商品参数信息  -->
      <detail-param-info  ref="params" :paramInfo="paramInfo"/>
      <!--  商品评价信息  -->
      <detail-rate ref="comment" :rates="rates"/>
      <!--  推荐信息  -->
      <detail-recommend ref="recommend"></detail-recommend>
    </scroll>
    <detail-main-tab-bar class="detail-main-tab-bar" @addCart="addCart"/>
    <back-top v-show="isShow" @click.native="backTopClick"/>
  </div>
</template>

<script>
import { getDetail, GoodsInfo, Shop, GoodsParam, Rate } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'

import DetailNavBar from './childComps/DetailNavBar'
import DetailBanner from './childComps/DetailBanner'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailMainTabBar from './childComps/DetailMainTabBar'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailRate from './childComps/DetailRate'
import DetailRecommend from './childComps/DetailRecommend'
import BackTop from 'components/content/backtop/BackTop'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'GoodsDetail',
  mixins: [itemListenerMixin],
  data () {
    return {
      id: null,
      isShow: false,
      betterSc: {},
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      rates: {},
      themeTopYs: [],
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailBanner,
    DetailBaseInfo,
    DetailShopInfo,
    DetailMainTabBar,
    DetailCommentInfo,
    DetailParamInfo,
    DetailRate,
    DetailRecommend,
    BackTop,
    Scroll
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
      //  5、获取商品参数信息
      this.paramInfo = new GoodsParam(datas.itemParams.info, datas.itemParams.rule)
      //  6、获取评价信息
      this.rates = new Rate(datas.rate)
    })
  },
  methods: {
    /*  刷新滚动高度函数  */
    myRefresh () {
      this.$refs.detailScroll.reCalculate()
      //  7、获取个分类盒子距离顶部的距离
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    refreshScrollHeight () {},
    /*  监听滚动  */
    scrollListen (position) {
      const y = -position.y
      const length = this.themeTopYs.length
      /*  监听滚动距离显示返回顶部图标  */
      if (y >= 1000) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      /*  监听滚动距离对应改变导航栏状态 */
      /*   法1  */
      // if (y < this.themeTopYs[1]) {
      //   this.$refs['detail-nav-bar'].currentIndex = 0
      // } else if (y < this.themeTopYs[2]) {
      //   this.$refs['detail-nav-bar'].currentIndex = 1
      // } else if (y < this.themeTopYs[3]) {
      //   this.$refs['detail-nav-bar'].currentIndex = 2
      // } else {
      //   this.$refs['detail-nav-bar'].currentIndex = 3
      // }
      /*   法2  */
      // for (let i = 0; i < this.themeTopYs.length; i++) {
      //   if ((this.currentIndex !== i) && ((i < length - 1 && y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1]) ||
      //     (i === length - 1 && y >= this.themeTopYs[i]))) {
      //     this.currentIndex = i
      //     this.$refs['detail-nav-bar'].currentIndex = i
      //   }
      // }
      /*   法3  */
      for (let i = 0; i < length - 1; i++) {
        if ((this.currentIndex !== i) && (y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs['detail-nav-bar'].currentIndex = i
        }
      }
    },
    /*  点击backTop返回顶部 */
    backTopClick () {
      this.$refs.detailScroll.scrollTo(0, 50, 1000)
    },
    titleClick (index) {
      this.$refs.detailScroll.scrollTo(0, -this.themeTopYs[index], 1000)
    },
    /*  添加到购物车  */
    addCart () {
      //  1、获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.realPrice = this.goods.realPrice
      product.id = this.id
      product.check = true
      //  2、将商品假如到购物车中
      this.$store.dispatch('addCart', product)
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
      position: relative;
      height: calc(100% - 93px);
    }

    .detail-main-tab-bar {
      position: relative;
      z-index: 12;
      width: 100%;
      height: 49px;
      background-color: #fff;
    }
  }
</style>
