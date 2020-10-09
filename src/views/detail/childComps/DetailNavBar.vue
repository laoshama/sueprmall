<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div class="back_img"
           slot="left"
           @click="goBackClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="center" slot="center">
        <div :class="{'title-item': true, active: currentIndex === index}"
             v-for="(item, index) in titles"
             :key="index"
             @click="titleItemClick(index)">
          {{  item  }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'
export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      isActive: true,
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    //  控制当前激活titles的颜色
    titleItemClick (index) {
      this.currentIndex = index
    },
    //  控制返回按钮
    goBackClick () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .detail-nav-bar {
    .back_img {
      img {
        position: relative;
        top: 4px;
      }
    }

    .center {
      display: flex;
      justify-content: space-around;
      font-size: 14px;

      .title-item {
        flex: 1;
      }
      .active {
        color: deeppink;
      }
    }
  }
</style>
