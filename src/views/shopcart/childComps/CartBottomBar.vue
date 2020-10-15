<template>
  <div class="cart-bottom-bar">
    <div class="icon-all">
      <div class="icon" @click="pickAllItemClick">
        <img :class="{'all-check': selectLength}" src="~assets/img/cart/tick.svg" alt="">
        <span>全选</span>
      </div>
      <div class="all">合计:￥{{ allPrice }}</div>
    </div>
    <div class="go-calculator" @click="goCal">去计算({{ allCounts }})</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  data () {
    return {
      isCheckAll: true
    }
  },
  computed: {
    ...mapGetters(['cartLength']),
    allPrice () {
      // let allPrice = 0
      // for (const item of this.$store.state.cartList) {
      //   if (item.check) {
      //     allPrice += item.count * item.realPrice
      //   }
      // }
      // return allPrice.toFixed(2)
      return this.$store.state.cartList.filter((item) => {
        return item.check
      }).reduce((preValue, item) => {
        return preValue + item.count * item.realPrice
      }, 0).toFixed(2)
    },
    allCounts () {
      // let counts = 0
      // for (const item of this.$store.state.cartList) {
      //   if (item.check) {
      //     counts += item.count
      //   }
      // }
      return this.$store.state.cartList.filter(item => {
        return item.check
      }).reduce((preValue, item, index, arr) => {
        return preValue + item.count
      }, 0)
    },
    selectLength () {
      if (this.cartLength === 0) return false

      // 方案1
      // return !(this.$store.state.cartList.filter(item => !item.check).length)

      // 方案2
      return !(this.$store.state.cartList.find(item => !item.check))

      // 方案3
      // for (let item of this.this.$store.state.cartList) {
      //   if (!item.check) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    //  全选和取消全选按钮
    pickAllItemClick () {
      if (this.selectLength) {
        this.isCheckAll = true
      } else {
        this.isCheckAll = false
      }
      this.isCheckAll = !this.isCheckAll
      this.$store.commit('isCheckAll', this.isCheckAll)
    },
    //  去计算
    goCal () {
      this.$store.state.cartList.find(item => item.check) ? this.$toast.show('计算') : this.$toast.show('请先选择购买商品')
      this.$toast.show('计算')
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    background-color: #d6d6d6;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
  }
  .cart-bottom-bar .icon-all {
    display: flex;
  }
  .cart-bottom-bar .icon {
    margin-right: 20px;
  }
  .cart-bottom-bar .icon img {
    position: relative;
    top: 3px;
    border-radius: 50%;
    width: 20px;
    margin-right: 6px;
    border: 2px solid #a0a0a0;
  }
  .cart-bottom-bar .icon .all-check {
    background-color: #ff0000;
    border-color: #ff0000;
  }
  .cart-bottom-bar .go-calculator {
    text-align: center;
    width: 100px;
    background-color: #ff6b09;
    color: #fff;
  }
</style>
