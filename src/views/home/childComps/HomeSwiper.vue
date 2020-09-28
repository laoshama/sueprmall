<template>
  <div id="home_swiper">
    <swiper :banners="banners"></swiper>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Object
    }
  },
  components: {
    Swiper
  }
}
</script>

<style scoped>

</style>
