<template>
  <div class="home_swiper">
    <swiper :count="banners.length" :showIndicator="true">
      <swiper-item v-for="(item, index) in banners" :key="index" >
        <img :src="item.image">
      </swiper-item>
    </swiper>
    <ul id="asd">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>
