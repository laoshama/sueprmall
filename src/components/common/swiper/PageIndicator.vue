<template>
  <div id="page_indicator">
    <ul>
      <li v-for="(item, index) in indicator_num" :key="index"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PageIndicator',
  props: {
    indicator_num: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
  #page_indicator {
    width: 100%;
    height: 20px;

  ul {
    display: flex;
    margin: 0 auto;
    justify-content: center;

    li {
      width: 8px;
      height: 8px;
      margin: 0 3px 0 3px;
      background-color: #fff;
      border-radius: 50%;
      }
    }
  }
</style>
