<template>
<div>
  <h1>ショッピングカート</h1>
        <table class="striped">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody v-for="(cartItem, index) of cartList" v-bind:key="cartItem.id">
            <tr>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="cartList[index].item.imagePath" />
                </div>
                <span>{{ cartList[index].item.name }}</span>
              </td>
              <td>
                <span class="price">{{ cartList[index].size }}</span
                >&nbsp;&nbsp;{{
                  cartList[index].unitItemPrice(index).toLocaleString()
                }}円 &nbsp;&nbsp;{{ cartList[index].quantity }}個
              </td>
              <td>
                <ul
                  v-for="topping of cartItem.orderToppingList"
                  v-bind:key="topping.id"
                >
                  <li>
                    {{ topping.name }} :
                    {{ cartList[index].toppingPrice(cartList[index].size) }}円
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">
                  合計金額
                  {{
                    cartList[index]
                      .calcTotalPrice(
                        cartList[index].size,
                        cartList[index].quantity,
                        cartItem.orderToppingList.length
                      )
                      .toLocaleString()
                  }}円
                </div>
              </td>
              <td>
                <button
                  class="btn"
                  type="button"
                  v-on:click="deleteOrderItem(index)"
                >
                  <span>削除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row cart-total-price">
        <span class="show-price"
          >税抜き {{ calcTotalPriceInCart().toLocaleString() }}円</span
        >
        <span class="show-price"
          >消費税 {{ calcTotalTaxPriceInCart().toLocaleString() }}</span
        >
        <div>
          ご注文金額合計 {{ calcTotalPricePlusTax().toLocaleString() }}円 (税込)
        </div>
      </div>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>