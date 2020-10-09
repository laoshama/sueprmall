<template>
  <div class="goodsDetail">
    <!--  导航栏   -->
    <detail-nav-bar/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      id: null
    }
  },
  components: {
    DetailNavBar
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>

<style lang="less" scoped>

</style>
