<template>
  <div class="detail-banner">
    <Swiper animDuration="1" interval="2000" :moveRatio="0.3" :indicator="true">
      <SwiperItem
        class="banner-images"
        v-for="(item, index) in topImages"
        :key="index">
          <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'
export default {
  name: 'DetailBanner',
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style lang="less" scoped>
  .banner-images{
    height: 300px;

    img {
      width: 100%;
    }
  }
</style>
