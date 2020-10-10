<template>
  <div class="detail-shop-info" v-if="Object.keys(shops).length !== 0">
    <!--  商家logo和名字显示  -->
    <div class="shop-name-logo">
      <img :src="shops.logo" alt="">
      <span>{{ shops.name }}</span>
    </div>
    <!--  总销量、全部宝贝、总体评价  -->
    <div class="shop-message">
      <div class="sell">
        <div>{{ allSell }}万</div>
        <div>总销量</div>
      </div>
      <div class="goods">
        <div>{{ shops.cGoods }}</div>
        <div>全部宝贝</div>
      </div>
      <div class="appraise">
        <div v-for="(item, index) in shops.score" :key="index">
          <span>{{ item.name }}</span>
          <span class="score" :style="{color: item.isBetter ? '#cd3126' : '#3aa42b'}">{{ item.score }}</span>
          <span v-if="item.isBetter" class="isHeight">高</span>
          <span v-else class="isLow">低</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shops: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    allSell () {
      const all = this.shops.sells / 10000
      return all.toFixed(2)
    }
  }
}
</script>

<style lang="less" scoped>
  .detail-shop-info {
    padding: 40px 10px;
    box-shadow: 0 2px 5px #ccc;

    .shop-name-logo {
      height:60px;
      margin-bottom: 20px;

      img {
        box-shadow: 0 0 4px #c6c8ca;
        vertical-align: bottom;
        height: 100%;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        line-height: 60px;
      }
    }
  }
  .shop-message{
    display: flex;
    font-size: 16px;

    .sell {
      align-self: center;
      padding-right: 20px;
      padding-left: 20px;
      height: 40px;
    }
    .goods {
      align-self: center;
      text-align: center;
      padding-right: 20px;
      border-right: 1px solid #d7d7d7;
      height: 40px;
    }
    .appraise {
      margin-left: 20px;

      span {
        margin-right: 12px;
        width: 100px;
        line-height: 30px;
      }
      .isHeight {
        background-color: #cd3126;
        color: #fff;
      }
      .isLow {
        background-color: #3aa42b;
        color: #fff;
      }
      .score {
        display: inline-block;
        width: 34px;
      }
    }
  }
</style>
