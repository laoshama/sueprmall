<template>
  <div class="wrapper" ref="wrapper">
    <div class="contentSum">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'

//  过静态方法注册插件
//  实例化BScroll时配置中要声明使用pullUpLoad
BScroll.use(PullUp)

export default {
  name: 'Scroll',

  data () {
    return {
      bs: null
      // cont: null
    }
  },

  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    //  滚动到指定位置
    scrollTo (x, y, time = 300) {
      this.bs && this.bs.scrollTo && this.bs.scrollTo(x, y, time)
    },

    //  重新计算ScrollHeight
    reCalculate () {
      this.bs && this.bs.refresh && this.bs.refresh()
      console.log('----')
    },

    //  上拉加载完成
    finishPullUp () {
      this.bs && this.bs.finishPullUp()
    }
  },

  mounted () {
    //  创建BScroll实例
    this.bs = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
      pullUpLoad: this.pullUpLoad
    })

    //  监听滚动事件
    this.bs.on('scroll', (position) => {
      this.$emit('scrollListen', position)
    })

    //  监听上拉事件
    this.bs.on('pullingUp', () => {
      this.$emit('pullingUpListen')
    })
  }
}
</script>

<style scoped>

</style>
