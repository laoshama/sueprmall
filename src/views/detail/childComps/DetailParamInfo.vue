<template>
  <div class="detail-param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="good-param" cellspacing="0">
      <tr v-for="(item, index) in paramInfo.sizes[0]" :key="index" >
        <td v-for="(it, indey) in item" :key="indey" class="sizes-item sizes-item-it">{{ it }}</td>
      </tr>
    </table>
    <table class="good-param" cellspacing="0">
      <tr v-for="(item, index) in paramInfo.infos" :key="index">
        <td class="sizes-item sizes-item-key">{{ item.key }}</td>
        <td class="sizes-item sizes-item-size">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .detail-param-info {

    .good-param {
      margin: 0 auto;
      margin-bottom: 20px;
      width: 90%;
      font-size: 12px;
      box-shadow: 0  2px 0 #cccccc;

      .sizes-item-it {
        width: 80px;
        padding-right: 9px;
      }
      .sizes-item {
        border-bottom: 1px solid #cccccc;
        height: 40px;
      }
      .sizes-item-key {
        width: 100px;
      }
      .sizes-item-size {
        color: red;
      }
    }
  }
</style>
