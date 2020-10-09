<template>
  <!--  未知bug，在此处加上这个事件监听后，在苹果端才能正常冒泡触发touch事件 -->
  <div class="slide"
       @touchstart=touch1
       @touchmove=touch2
       @touchend=touch3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  methods: {
    touch1 () {},
    touch2 () {},
    touch3 () {}
  }
}
</script>

<style lang="less" scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }
</style>
