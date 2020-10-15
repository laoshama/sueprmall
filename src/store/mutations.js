import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  //  mutations唯一 的目的就是修改state中的状态
  //  mutations中的方法尽量单一
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  [ADD_TO_CART] (state, payload) {
    state.cartList.push(payload)
  },
  changeCheck (state, item) {
    item.check = !item.check
  },
  isCheckAll (state, payload) {
    // 方案1
    // for (const item of state.cartList) {
    //   item.check = payload
    //   console.log(item)
    // }

    // 方案2
    state.cartList.forEach(item => {
      item.check = payload
    })
  }
}
