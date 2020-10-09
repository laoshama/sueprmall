<template>
  <div class="goodsDetail">
    <!--  导航栏   -->
    <detail-nav-bar/>
    <!--  轮播图   -->
    <detail-banner :topImages="topImages"/>
    <!--  商品描述信息  -->
    <detail-base-info :goods="goods"/>
    <!--  商家描述信息  -->
    <detail-shop-info :shops="shops"/>
    <ul>
      <li>嘀嘀嘀1</li>
      <li>嘀嘀嘀2</li>
      <li>嘀嘀嘀3</li>
      <li>嘀嘀嘀4</li>
      <li>嘀嘀嘀5</li>
      <li>嘀嘀嘀6</li>
      <li>嘀嘀嘀7</li>
      <li>嘀嘀嘀8</li>
      <li>嘀嘀嘀9</li>
      <li>嘀嘀嘀10</li>
      <li>嘀嘀嘀11</li>
      <li>嘀嘀嘀12</li>
      <li>嘀嘀嘀13</li>
      <li>嘀嘀嘀14</li>
      <li>嘀嘀嘀15</li>
      <li>嘀嘀嘀16</li>
      <li>嘀嘀嘀17</li>
      <li>嘀嘀嘀18</li>
      <li>嘀嘀嘀19</li>
      <li>嘀嘀嘀20</li>
      <li>嘀嘀嘀21</li>
      <li>嘀嘀嘀22</li>
      <li>嘀嘀嘀23</li>
      <li>嘀嘀嘀24</li>
      <li>嘀嘀嘀25</li>
      <li>嘀嘀嘀26</li>
      <li>嘀嘀嘀27</li>
      <li>嘀嘀嘀28</li>
      <li>嘀嘀嘀29</li>
      <li>嘀嘀嘀30</li>
      <li>嘀嘀嘀31</li>
      <li>嘀嘀嘀32</li>
      <li>嘀嘀嘀33</li>
      <li>嘀嘀嘀34</li>
      <li>嘀嘀嘀35</li>
      <li>嘀嘀嘀36</li>
      <li>嘀嘀嘀37</li>
      <li>嘀嘀嘀38</li>
      <li>嘀嘀嘀39</li>
      <li>嘀嘀嘀40</li>
    </ul>
  </div>
</template>

<script>
import { getDetail, GoodsInfo, Shop } from 'network/detail'

import DetailNavBar from './childComps/DetailNavBar'
import DetailBanner from './childComps/DetailBanner'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

export default {
  name: 'GoodsDetail',
  data () {
    return {
      id: null,
      topImages: [],
      goods: {},
      shops: {}
    }
  },
  components: {
    DetailNavBar,
    DetailBanner,
    DetailBaseInfo,
    DetailShopInfo
  },
  created () {
    //  1、保存传入的id
    this.id = this.$route.params.id

    //  2、请求数据
    getDetail(this.id).then(res => {
      const datas = res.data.result
      //  1、获取顶部的图片
      this.topImages = datas.itemInfo.topImages
      //  2、获取商品信息
      this.goods = new GoodsInfo(datas.itemInfo, datas.columns, datas.shopInfo)
      //  3、获取商家信息
      this.shops = new Shop(datas.shopInfo)
    })
  }
}
</script>

<style lang="less" scoped>

</style>
