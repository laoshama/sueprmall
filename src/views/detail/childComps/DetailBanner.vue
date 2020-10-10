<template>
  <div class="detail-banner">
    <Swiper animDuration="1" interval="2000" :moveRatio="0.3" :indicator="true">
      <SwiperItem
        class="banner-images"
        v-for="(item, index) in topImages"
        :key="index">
          <img :src="item" alt="" @load="detailBannerImageLoad">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'
export default {
  name: 'DetailBanner',
  data () {
    return {
      count: 0,
      imageLength: 0
    }
  },
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
  },
  methods: {
    /*  可以在加载多张图片时只发送一次事件 */
    detailBannerImageLoad () {
      if (this.count >= this.imageLength) {
        this.$emit('detailBannerImageLoad')
      }
    }
  },
  watch: {
    topImages () {
      this.imageLength = this.topImages.length
    }
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
