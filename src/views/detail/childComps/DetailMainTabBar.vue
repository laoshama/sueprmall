<template>
  <div class="detail-main-tab-bar">
    <tab-bar>
      <tab-bar-item>
        <div slot="item-text">客服</div>
      </tab-bar-item>
      <tab-bar-item>
        <div slot="item-text">客服</div>
      </tab-bar-item>
      <tab-bar-item>
        <div slot="item-text">客服</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'DetailMainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
