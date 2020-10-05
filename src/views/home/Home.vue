<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <ul>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
      <li>40</li>
    </ul>
  </div>
</template>

<script>
import { getHomeMultidata } from 'network/home'

import NavBar from 'components/common/navigationbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import HomeSwiper from 'views/home/childComps/HomeSwiper'

export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: {},
      dKeywords: {},
      keywords: {}
    }
  },
  components: {
    NavBar,
    TabControl,
    HomeSwiper
  },
  created () {
    // 1、请求多个数据
    getHomeMultidata().then(res => {
      // 箭头函数中的this指向函数外部
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend
      // this.dKeywords = res.data.data.dKeyword
      // this.keywords = res.data.data.keywords
      // console.log(this.banners)
    })
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
