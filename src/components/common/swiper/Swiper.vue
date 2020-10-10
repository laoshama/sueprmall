<template>
  <div class="swiper">
    <!--  定义轮播图图片插槽  -->
    <div class="banner_img_box"
         ref="wrapper"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
         :style="bannerImgBoxStyle">
      <slot></slot>
    </div>
    <!--  轮播图控制器 -->
    <div v-if="isNeedIndicator" class="banner_indicator">
      <div class="indicator"
           :class="{ isActive: currentIndex === index }"
           v-for="(item, index) in slideCount"
           :key="index">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Swiper',
  data () {
    return {
      currentIndex: 0,
      slideCount: 0,
      startX: 0,
      totalWidth: 0,
      bannerImgBoxStyle: {},
      distance: 0,
      animToggle: false,
      intervalToggle: false,
      options: '',
      isScrolling: true,
      isNeedIndicator: true
    }
  },
  props: {
    interval: {
      type: String,
      default: '3000'
    },
    animDuration: {
      type: String,
      default: '3'
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: true
    }
  },
  mounted: function () {
    setTimeout(() => {
      //  操作DOM元素
      this.handleDom()
      //  是否显示轮播图控制器
      this.isIndicator()
      //  是否开启动画
      this.startAnimation()
      //  启动定时器(让轮播图动起来)
      this.startTimer()
    }, 1000)
  },
  methods: {
    //  刚触摸到屏幕时的操作
    touchStart (event) {
      //  只有一张图片时不作为
      if (this.slideCount <= 1) return
      //  记录起始触摸位置距页面左边距离
      this.startX = event.touches[0].pageX
      //  暂停定时器
      this.stopTimer()
      //  暂停动画
      this.stopAnimation()
    },
    //  拖动时进行的操作
    touchMove (event) {
      //  只有一张图片时不作为
      if (this.slideCount <= 1) return
      //  计算触摸点移动时动态的pageX
      this.distance = this.startX - event.touches[0].pageX
      //  当前所在位置
      const currentPosition = this.currentIndex * this.totalWidth
      const moveDistance = this.distance + currentPosition
      this.setTransform(moveDistance)
    },
    //  停止触摸屏幕时的操作
    touchEnd () {
      //  只有一张图片时不作为
      if (this.slideCount <= 1) return
      this.checkPosition()
      //  移动完成开启定时器
      this.startTimer()
      //  开启半动画
      this.halfAnimal()
      //  开启动画
      this.startAnimation()
    },
    //  校验定位
    checkPosition () {
      //  计算总移动比例
      const totalDistance = Math.abs(this.distance / this.totalWidth)
      //  如果超过指定比例则自动移动一张图得距离
      if (totalDistance < 0.3) {
        //  小于比例则松开后恢复原位
        this.setTransform(this.totalWidth * this.currentIndex)
      } else {
        //  大于比例，松开后翻向下一页
        if (this.distance > 0) {
          //  当向右滑动到头时自动从头开始
          if (this.currentIndex >= this.slideCount - 1) {
            this.setTransform(this.totalWidth * this.slideCount)
            this.currentIndex = 0
            //  若滑到克隆出来的最后一页时，定位到图片真实存在的第一页
            setTimeout(() => {
              this.stopAnimation()
              this.setTransform(0)
              this.startAnimation()
            }, 500)
          } else {
            this.currentIndex++
            this.setTransform(this.totalWidth * this.currentIndex)
          }
        } else if (this.distance < 0) {
          // 当滑动到头时自动从头开始
          if (this.currentIndex <= 0) {
            this.setTransform(-this.totalWidth)
            this.currentIndex = this.slideCount - 1
            //  若滑到克隆出来的第一页时，定位到图片真实存在的最后一页
            setTimeout(() => {
              this.stopAnimation()
              this.setTransform(this.totalWidth * (this.slideCount - 1))
              this.startAnimation()
            }, 500)
          } else {
            this.currentIndex--
            this.setTransform(this.totalWidth * this.currentIndex)
          }
        }
      }
    },
    //  变换样式函数
    setTransform (option) {
      this.isScrolling = false
      if (this.animToggle) {
        this.bannerImgBoxStyle = {
          transform: `translateX(${-this.totalWidth - option}px)`,
          '-webkit-transform': `translateX(${-this.totalWidth - option}px)`,
          '-ms-transform': `translateX(${-this.totalWidth - option}px)`,
          transition: `all ${this.animDuration}s`
        }
        return false
      }
      this.bannerImgBoxStyle = {
        transform: `translateX(${-this.totalWidth - option}px)`
      }
      this.options = option
    },
    //  开启动画
    startAnimation () {
      if (this.animDuration === 'false') {
        this.animToggle = false
      } else {
        this.animToggle = true
      }
    },
    //  暂停动画
    stopAnimation () {
      this.animToggle = false
    },
    //  释放触摸半动画
    halfAnimal () {
      this.bannerImgBoxStyle = {
        transform: `translateX(${-this.totalWidth - this.options}px)`,
        transition: '300ms'
      }
    },
    //  操作DOM元素
    handleDom () {
      //  获取父节点banner_img_box
      const far = this.$refs.wrapper
      // 指定指示器显示个数
      this.slideCount = far.children.length
      this.totalWidth = far.offsetWidth

      //  如果总图大于1，则在第一个元素之前添加最后一个元素
      if (this.slideCount > 1) {
        const lastNode = far.lastChild.cloneNode(true)
        const firstchild = far.firstChild.cloneNode(true)
        //  在末尾加上一个数据中的第一个元素
        far.appendChild(firstchild)
        //  在第一个元素之前添加最后数据中的最后一个元素
        far.insertBefore(lastNode, far.children[0])
        //  控制显示理论上的第一张图片
        this.setTransform(0)
      }
      //  只有一张图则不显示轮播图显示器
      this.isNeedIndicator = false
    },
    //  启动定时器函数
    startTimer () {
      //  不设置启动定时器或者只有一张图时都不启动定时器
      if (this.interval === 'false' || this.slideCount <= 1) return false
      this.swiperTimer = window.setInterval(this.timerGo, this.interval)
    },
    //  暂停定时器
    stopTimer () {
      window.clearInterval(this.swiperTimer)
    },
    //  启动定时器后自动滚动函数
    timerGo () {
      this.currentIndex++
      this.setTransform(this.totalWidth * this.currentIndex)
      //  自动滚动时 边缘处理
      this.borderHandle()
    },
    //  边缘处理函数
    borderHandle () {
      if (this.currentIndex > this.slideCount - 1) {
        this.currentIndex = 0
        this.stopAnimation()
        setTimeout(() => {
          this.setTransform(0)
          this.startAnimation()
        }, this.interval / 2)
      }
    },
    //  轮播图控制器选择
    isIndicator () {
      this.isNeedIndicator = this.indicator
    }
  }
}

</script>

<style lang="less" scoped>
  .swiper {
    position: relative;
    text-align: center;
    overflow: hidden;

    .banner_img_box {
      display: flex;
    }

    .banner_indicator {
      position: absolute;
      bottom: 10px;
      width: 100%;

      .indicator {
        display: inline-block;
        margin:0 5px;
        width: 10px;
        height: 10px;
        background-color: #ffffff;
        border-radius: 50%;
      }
      .isActive {
        background-color: #f00;
      }
    }
  }
</style>
