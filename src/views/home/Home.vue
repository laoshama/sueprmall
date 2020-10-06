<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control"  @tabClick="tabClick" :titles="['流行','新款','精选']"/>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'network/home'

import NavBar from 'components/common/navigationbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import GoodsList from 'components/content/goods/GoodsList'

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
      currentType: 'pop'
    }
  },
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList
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
  }
}
</script>

<style lang="less" scoped>
  #home {
    padding-top: 44px;

    .home-nav {
      background-color: var(--color-tint);
      color: #fff;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 10;
    }
    .tab-control {
      position: sticky;
      top: 44px;
      background-color: #fff;
    }
  }

</style>
