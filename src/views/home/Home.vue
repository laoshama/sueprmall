<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'
import { getHomeMultidata } from 'network/home'
import HomeSwiper from 'views/home/childComps/HomeSwiper'

export default {
  name: 'Home',
  data () {
    return {
      banners: {},
      recommends: {},
      dKeywords: {},
      keywords: {}
    }
  },
  components: {
    NavBar,
    HomeSwiper
  },
  created () {
    // 1、请求多个数据
    getHomeMultidata().then(res => {
      // 箭头函数中的this指向函数外部
      this.banners = res.data.data.banner
      this.recommends = res.data.data.recommend
      // this.dKeywords = res.data.data.dKeyword
      // this.keywords = res.data.data.keywords
      console.log(this.banners)
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
