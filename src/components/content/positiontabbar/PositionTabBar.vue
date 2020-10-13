<template>
  <div class="position-tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PositionTabBar'
}
</script>

<style scoped>
  .position-tab-bar {
    display: flex;
    text-align: center;
    width: 100%;
    height: 100%;

  }
</style>
