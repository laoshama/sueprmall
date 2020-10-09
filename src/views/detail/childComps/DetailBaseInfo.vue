<template>
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info" >
    <!--  商品标题描述  -->
    <div class="detail-title">{{ goods.title }}</div>
    <!--  价格显示  -->
    <div class="price">
      <span class="new-price"
            :style="{color: goods.discountBgColor}"
      >{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount"
            :style="{backgroundColor: goods.discountBgColor}">
        {{ goods.discount }}
      </span>
    </div>
    <!--  显示销量数据  -->
    <div class="columns">
      <div v-for="item in goods.columns.length - 1"
           :key="item">
        {{ goods.columns[item - 1] }}
      </div>
      <div>{{ goods.services[0].name }}</div>
    </div>
    <!--  销售服务信息  -->
    <div class="service">
      <div class="service-item"
           v-for="index in goods.services.length - 1"
           :key="index">
        <img :src="goods.services[index].icon" v-if="goods.services[index]" class="icon" alt="">
        <span class="service-name">{{  goods.services[index].name  }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  data () {
    return {
      isCreate: false
    }
  },
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .detail-title {
    padding: 8px;
    font-size: 18px;
    font-weight:800;
  }

  .new-price {
    display: inline-block;
    margin: 10px;
    font-size: 24px;
  }
  .old-price {
    color: #CACACA;
    text-decoration-line: line-through;
    font-size: 15px;
  }
  .discount {
    position: relative;
    top: -10px;
    left: 3px;
    padding-left: 3px;
    padding-right: 6px;
    color: #fff1f0;
    font-size: 16px;
    border-radius: 10px;
  }
  .columns {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #9c9c9c;
    padding: 10px;
    box-shadow: 0 2px 3px #dddddd;
  }
  .service {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom:20px;
    font-size: 14px;
    box-shadow: 0 3px 5px #dddddd;
  }
  .service .icon {
    width: 16px;
    vertical-align: middle;
  }
  .service-item {
    flex-shrink: 0;
  }
</style>
