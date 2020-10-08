<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="0"
            @scrollListen="scrollListen"
            @pullingUpListen="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"  @tabClick="tabClick" :titles="['流行','新款','精选']"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow_backTop"/>
  </div>
</template>

<script>
/*  网络请求文件导入  */
import { getHomeMultidata, getHomeGoods } from 'network/home'

/*  功能函数导入  */
import { debounce } from 'common/utils'

/*  组件导入  */
import NavBar from 'components/common/navigationbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import backTop from 'components/content/backtop/backTop'

export default {
  name: 'Home',

  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShow_backTop: false
      // firstHomeContentHeight: 0,
      // contentDom: null
    }
  },

  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    backTop
  },

  created () {
    // 1、请求轮播图和推荐数据
    this.getHomeMultidata()

    // 2、请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*
       事件监听相关的方法
    */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backTop () {
      this.$refs.scroll.scrollTo(0, 0, 2000)
    },
    scrollListen (position, contentDom) {
      if (position.y < -1500) {
        this.isShow_backTop = true
      } else {
        this.isShow_backTop = false
      }
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
      setTimeout(() => {
        this.$refs.scroll.finishPullUp()
      }, 2000)
    },

    /*
       网络请求
    */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // 箭头函数中的this指向函数外部
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page++
      })
    }
  },
  mounted () {
    // 通过事件总线监听item中图片加载完成
    let reCalculate = null
    if (!this.$refs.scroll.bs) {
      //  alert('scroll实例未初始化完成')
      setTimeout(() => {
        reCalculate = debounce(this.$refs.scroll.reCalculate, 500)
      }, 2000)
    } else {
      reCalculate = debounce(this.$refs.scroll.reCalculate, 500)
    }

    this.$bus.$on('itemImageLoad', () => {
      reCalculate()
    })
  }
}
</script>

<style lang="less" scoped>
  #home {
    padding-top: 44px;
    height: 100vh;

    .home-nav {
      background-color: var(--color-tint);
      color: #fff;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 10;
    }

    .content{
      height: calc(100% - 49px);
      overflow: hidden;
    }
    .tab-control {
      top: 44px;
      background-color: #fff;
    }
  }

</style>
