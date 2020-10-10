<template>
  <div class="point-line">
    <div v-if="direction === 'left'" class="line-point-left line" ></div>
    <div v-else class="line-point-right line"></div>
    <div v-if="direction === 'right'" class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'PointLine',
  props: {
    direction: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style scoped>
  .point-line {
    position: relative;
  }
  .line {
    display: inline-block;
    width: 100%;
    height: 10px;
    border-bottom: 1px solid #727272;
    margin-bottom: 6px;
    margin-top: 6px;
  }
  .line-point-left::before {
    display: inline-block;
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #727272;
  }
  .right::after {
    position: absolute;
    top: 12px;
    display: inline-block;
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #727272;
  }
</style>
