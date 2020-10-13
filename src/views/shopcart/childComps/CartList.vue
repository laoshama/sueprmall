<template>
  <div class="cart-list">
    <cart-item class="cart-item"
               v-for="(item, index) in $store.state.cartList"
               :key="index"
               @click.native="itemClick(item)">
      <img slot="tick" :class="{tick: true, check: item.check}" src="~assets/img/cart/tick.svg" alt="">
      <img slot="img" :src="item.image" alt="" @load="cartImageLoad">
      <div class="title" slot="title">{{ item.title }}</div>
      <div class="desc" slot="desc">{{ item.desc }}</div>
      <div slot="price">￥{{ item.realPrice }}</div>
      <div slot="count">x{{ item.count }}</div>
      <div>{{ item.check }}</div>
    </cart-item>
  </div>
</template>

<script>
import CartItem from './CartItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  data () {
    return {
      count: 0
    }
  },
  components: {
    CartItem
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  methods: {
    //  刷新betterScroll的wrapper高度
    cartImageLoad () {
      this.count++
      if (this.count >= this.cartLength) {
        this.$emit('cartImageLoad')
      }
    },
    //  点击触发store中改变选中状态事件
    itemClick (item) {
      this.$store.commit('changeCheck', item)
    }
  }
}
</script>

<style scoped>
  .cart-list {
    width: 100%;
  }
  .cart-item {
    width: 100%;
    margin: 10px 5px 5px 0;
  }
  .cart-item .tick {
    position: relative;
    left: 3px;
    width: 22px;
    margin-right: 5px;
    border-radius: 50%;
    border: 2px solid #aaaaaa;
  }
  .cart-item .check {
    background-color: #f00;
    border-color: #f00;
  }
  .cart-item .title,
  .cart-item .desc {
    width: 70%;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    font-size: 18px;
  }
  .cart-item .desc {
    font-size: 14px;
  }
  img {
    display: block;
    width: 70px;
    border-radius: 5px;
  }
</style>
