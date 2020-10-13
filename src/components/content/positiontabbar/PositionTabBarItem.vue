<template>
  <div class="position-tab-bar-item">
    <slot name="icon"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'PositionTabBarItem'
}
</script>

<style scoped>
  .position-tab-bar-item {
    flex: 1;
    height: 100%;
  }
</style>
