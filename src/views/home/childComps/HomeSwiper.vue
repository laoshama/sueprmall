<template>
  <div class="home_swiper">
    <swiper :count="banners.length" :showIndicator="true" animDuration="1" interval="3000">
      <swiper-item v-for="(item, index) in banners" :key="index" >
        <a class="banner_link" :href="item.link">
          <img :src="item.image" @load="ImageLoad" width="375">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    ImageLoad () {
      if (!this.isLoad) {
        this.$emit('SwiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
  .banner_link {
    display: block;
  }
</style>
