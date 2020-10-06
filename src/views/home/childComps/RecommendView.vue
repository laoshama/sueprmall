<template>
  <div class="recommend">
    <div class="recommend_item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .recommend {
    display: flex;
    text-align: center;
    width: 100%;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;

    .recommend_item {
      font-size: 14px;
      flex: 1;

      img {
        width: 80px;
        vertical-align: bottom;
      }

      div{
        margin-top: 10px;
      }
    }
  }
</style>
