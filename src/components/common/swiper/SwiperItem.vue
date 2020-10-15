<template>
  <!--  未知bug，在此处加上这个事件监听后，在苹果端才能正常冒泡触发touch事件 -->
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }
</style>
