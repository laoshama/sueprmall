<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles"
         :key="index"
         :class="{active: index === currentIndex}"
         @click="turnToRed(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      active: true,
      currentIndex: 0
    }
  },
  methods: {
    turnToRed (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 44px;
    line-height: 44px;

    .tab-control-item {
      flex: 1;
    }

    .active {
      color: var(--color-high-text)
    }

    .active span {
      border-bottom: 2px solid red;
      padding: 10px;
    }
  }
</style>
