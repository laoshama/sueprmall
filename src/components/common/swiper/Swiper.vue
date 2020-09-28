<template>
  <div id="swiper">
    <swiper-item></swiper-item>
    <page-indicator :indicator_num="banners.list" class="indicator"></page-indicator>
  </div>
</template>

<script>
import PageIndicator from './PageIndicator'
import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name: 'Swiper',
  props: {
    banners: {
      type: Object
    }
  },
  components: {
    PageIndicator,
    SwiperItem
  }
}
</script>

<style lang="less" scoped>
  #swiper {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #f00;

    .indicator {
      position: absolute;
      bottom: 0;
    }
  }
</style>
