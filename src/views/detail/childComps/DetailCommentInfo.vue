<template>
  <div class="detail-comment-info" v-if="Object.keys(detailInfo).length !== 0">
    <!-- 商品详情信息 -->
    <div class="description">
      <point-line class="point-left"></point-line>
      <span>{{ detailInfo.desc }}</span>
      <point-line class="point-right" direction="right"></point-line>
    </div>
    <!--  商品照片信息  -->
    <div class="goods-photos">
      <div class="key">{{ detailInfo.detailImage[0].key }}</div>
      <div class="key">{{ detailInfo.detailImage[0].desc }}</div>
      <div class="item"
           v-for="(item, index) in detailInfo.detailImage[0].list"
           :key="index">
        <img :src="item" alt="" @load="moreGoodsImageLoad">
      </div>
    </div>
  </div>
</template>

<script>
import PointLine from 'components/common/pointline/PointLine'
export default {
  name: 'DetailCommentInfo',
  data () {
    return {
      count: 0,
      imageLength: 0
    }
  },
  components: {
    PointLine
  },
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    moreGoodsImageLoad () {
      if (++this.count >= this.imageLength) {
        this.$emit('moreGoodsImageLoad')
      }
    }
  },
  watch: {
    //  避免多次通过这this.detailInfo.detailImage[0].list.length长串的链式调用获取图片个数
    detailInfo () {
      this.imageLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style lang="less" scoped>
  .description {
    position: relative;
    margin: 10px auto;
    width: 92%;
    font-size: 14px;

    .point-left {
      margin-bottom: 4px;
      width: 100px;
    }
    .point-right {
      width: 100px;
      position: relative;
      left: 69%;
      top: -4px;
    }
  }

  .goods-photos {
    .key {
      font-size: 16px;
    }
    .item {
      width: 100%;
    }
    img {
      width: 100%;
    }
  }

</style>
