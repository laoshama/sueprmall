import { request } from './request'

export function getDetail (id) {
  return request({
    url: '/detail',
    params: {
      iid: id
    }
  })
}

export class GoodsInfo {
  constructor (itemInfo, columns, shopInfo) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.realPrice = itemInfo.lowNowPrice
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = shopInfo.services
  }
}

export class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.cGoods = shopInfo.cGoods
  }
}