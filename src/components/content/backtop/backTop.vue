<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'backTop'
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 100px;
    right: 2px;
    opacity: .8;
  }
  img {
    width: 60px;
  }
</style>
