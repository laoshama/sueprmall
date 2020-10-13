<template>
  <div class="cart-item">
    <div class="tick">
      <slot name="tick"></slot>
    </div>
    <div class="icon">
      <slot name="img"></slot>
    </div>
    <div class="title-desc-price-count">
      <div class="title">
        <slot name="title"></slot>
        <slot name="desc"></slot>
      </div>
      <div class="price-count">
        <div class="price">
          <slot name="price"></slot>
        </div>
        <div class="count">
          <slot name="count"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem'
}
</script>

<style scoped>
  .cart-item {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #cccccc;
    padding-bottom: 10px;
  }
  .icon {
    width: 100px;
  }
  .title-desc-price-count {
    width: 100%;
    margin: 0 10px 0;
  }
  .title-desc-price-count .title{
    margin-bottom: 20px;
  }
  .price-count {
    width: 70%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    bottom: -5px;
  }
  .price {
    color: red;
  }
</style>
