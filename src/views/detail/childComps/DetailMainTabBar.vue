<template>
  <div class="detail-main-tab-bar">
    <position-tab-bar class="bottom-tab-bar">
      <position-tab-bar-item>
        <div class="icon customer" slot="icon"></div>
        <div slot="content">客服</div>
      </position-tab-bar-item>
      <position-tab-bar-item>
        <div class="icon shop" slot="icon"></div>
        <div slot="content">店铺</div>
      </position-tab-bar-item>
      <position-tab-bar-item>
        <div class="icon collect" slot="icon"></div>
        <div slot="content">收藏</div>
      </position-tab-bar-item>
      <span class="join-cart" @click="addCart">加入购物车</span>
      <span class="buy">购买</span>
    </position-tab-bar>
  </div>
</template>

<script>
import PositionTabBar from 'components/content/positiontabbar/PositionTabBar'
import PositionTabBarItem from 'components/content/positiontabbar/PositionTabBarItem'

export default {
  name: 'DetailMainTabBar',
  components: {
    PositionTabBar,
    PositionTabBarItem
  },
  methods: {
    addCart () {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .bottom-tab-bar {
    font-size: 16px;
  }

  .customer {
    background:url('~assets/img/detail/detail_bottom.png') 16px -70px/30px no-repeat;
  }
  .shop {
    background:url('~assets/img/detail/detail_bottom.png') 16px -133px/30px no-repeat;
  }
  .collect {
    background:url('~assets/img/detail/detail_bottom.png') 16px 1px/30px no-repeat;
  }
  .icon {
    height: 30px;
    text-align: center;
  }

  .join-cart,
  .buy {
    background-color: #ff0;
    line-height: 49px;
    width: 25%;
  }
  .buy {
    background-color: #ff81b5;
  }
</style>
