<template>
  <div ref="shop-cart" class="shop-cart" v-if="Object.keys(cartLength !== 0)">
    <!--  导航栏   -->
    <nav-bar class="nav_bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--  商品列表  -->
    <scroll class="cart-scroll" ref="cart-scroll" :probeType="3">
      <cart-list @cartImageLoad="cartImageLoad"/>
    </scroll>
    <!--  底部工具栏  -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'
import CartList from './childComps/CartList'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  methods: {
    cartImageLoad () {
      this.$refs['cart-scroll'].reCalculate()
    }
  },
  mounted () {
    this.$refs['cart-scroll'].reCalculate()
  },
  activated () {
    /*  激活后刷新一次bs内容的高度。

        附加：
        （前提：这个组件已经被挂载过了，如果是未被挂载，
        那么需要考虑图片是否完成加载和元素高度的问题）

        组件如果被保留（keep-alive）没被销毁，
        那么该组件的所有属性都会再缓存中动态改变。
        一旦激活该组件，
        那么该组件的高度等属性都会是最新的属性，
        不用再担心因为图片未加载而导致高度宽度变化的问题
        因为图片已经在缓存中响应式的加载了
    */
    this.$refs['cart-scroll'].reCalculate()
  }
}
</script>

<style scoped>
  .shop-cart {
    height: 100vh;
  }
  .cart-scroll {
    height: calc(100% - 123px);
  }
  .nav_bar {
    background-color: var(--color-tint);
    color: #ffffff;
    width: 100%;
  }
</style>
