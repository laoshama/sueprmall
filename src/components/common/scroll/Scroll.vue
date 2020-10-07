<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
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
  mounted () {
    this.bs = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
      pullUpLoad: this.pullUpLoad
    })

    this.bs.on('scroll', (position) => {
      this.$emit('scrollListen', position)
    })

    this.bs.on('pullingUp', () => {
      //  上拉事件执行完成
      setTimeout(() => {
        this.bs.finishPullUp()
      }, 2000)
    })

    // 重新计算长度，因为加载图片时可能没有能完全加载进来，
    // 所以需要重新计算元素长度
    setTimeout(() => {
      this.bs.refresh()
    }, 1000)
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.bs.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
</style>
