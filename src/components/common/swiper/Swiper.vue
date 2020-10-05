<template>
  <div class="swiper">
    <!--  定义轮播图图片插槽  -->
    <div class="banner_img_box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" :style="bannerImgBoxStyle">
      <slot></slot>
    </div>
    <!--  轮播图控制器 -->
    <div class="banner_indicator">
      <div class="indicator"
           :class="{ isActive: currentIndex === index }"
           v-for="(item, index) in slideCount"
           :key="index"></div>
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
      endPoint: 0,
      totalWidth: 0,
      bannerImgBoxStyle: {},
      distance: 0,
      swiperTimer: ''
    }
  },
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  mounted: function () {
    setTimeout(() => {
      //  操作DOM元素
      this.handleDom()
      //  启动定时器 让轮播图动起来
      this.startTimer()
    }, 2000)
  },
  methods: {
    //  刚触摸到屏幕时的操作
    touchStart (event) {
      //  记录起始触摸位置距页面左边距离
      this.startX = event.touches[0].pageX
      //  暂停定时器
      this.stopTiemr()
    },
    //  拖动时进行的操作
    touchMove (event) {
      //  计算触摸点移动时动态的pageX
      this.distance = this.startX - event.touches[0].pageX
      //  当前所在位置
      const currentPosition = this.currentIndex * this.totalWidth
      const moveDistance = this.distance + currentPosition
      this.setTransform(moveDistance)
    },
    //  停止触摸屏幕时的操作
    touchEnd (event) {
      this.checkPosition()
      //  移动完成开启定时器
      this.startTimer()
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
            this.currentIndex = 0
          } else {
            this.currentIndex++
          }
          this.setTransform(this.totalWidth * this.currentIndex)
        } else if (this.distance < 0) {
          //  当滑动到头时自动从头开始
          if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount - 1
          } else {
            this.currentIndex--
          }
          this.setTransform(this.totalWidth * this.currentIndex)
        }
      }
    },
    //  变换样式函数
    setTransform (option) {
      this.bannerImgBoxStyle = {
        transform: `translateX(${-this.totalWidth - option}px)`
      }
    },
    //  操作DOM元素
    handleDom () {
      // 指定指示器显示个数
      const slideArr = document.getElementsByClassName('slide')
      this.slideCount = slideArr.length
      this.totalWidth = slideArr[0].offsetWidth

      //  如果总图大于1，则在第一个元素之前添加最后一个元素
      if (this.slideCount > 1) {
        //  获取父节点banner_img_box
        const far = document.querySelector('.banner_img_box')
        const lastNode = slideArr[this.slideCount - 1].cloneNode(true)
        const firstchild = slideArr[0].cloneNode(true)
        //  在末尾加上一个数据中的第一个元素
        far.appendChild(firstchild)
        //  在第一个元素之前添加最后数据中的最后一个元素
        far.insertBefore(lastNode, slideArr[0])
        //  控制显示理论上的第一张图片
        this.bannerImgBoxStyle = {
          left: `-${this.totalWidth}px`
        }
      }
    },
    //  定时器轮播函数
    timerGo () {
      //  当向右滑动到头时自动从头开始
      if (this.currentIndex >= this.slideCount - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.setTransform(this.totalWidth * this.currentIndex)
    },
    //  启动定时器函数
    startTimer () {
      this.swiperTimer = setInterval(this.timerGo, 5000)
    },
    //  移除定时器
    stopTiemr () {
      window.clearInterval(this.swiperTimer)
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
      position: relative;
      /*transition: all 1s;*/
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
