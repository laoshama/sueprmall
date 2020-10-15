import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart ({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      //  1、payload新添加的物品
      // let oldProduct = null
      // for (const item of state.cartList) {
      //   if (item.id === payload.id) {
      //     oldProduct = item
      //   }
      // }
      const oldProduct = state.cartList.find(item => item.id === payload.id)
      //  2、判断oldProduct
      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        resolve('商品数量加1')
      } else {
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
