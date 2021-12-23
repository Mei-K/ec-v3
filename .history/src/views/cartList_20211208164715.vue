<template>
  <div class="container">
    <!-- table -->
    <div class="row">
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
              >&nbsp;&nbsp;{{ cartList[index].unitItemPrice(index) }}円
              &nbsp;&nbsp;{{ cartList[index].quantity }}個
            </td>
            <td>
              <ul
                v-for="topping of cartItem.orderToppingList"
                v-bind:key="topping.id"
              >
                <li>{{ topping.name }} : {{}}円</li>
              </ul>
            </td>
            <td>
              <div class="text-center">合計金額 {{}}円</div>
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
      <div>消費税：{{}}</div>
      <div>ご注文金額合計：38,000円 (税込)</div>
    </div>
    <div class="row order-confirm-btn">
      <button
        class="btn"
        type="button"
        onclick="location.href='order_confirm.html'"
      >
        <span>注文に進む</span>
      </button>
    </div>
  </div>
  <!-- end container -->
</template>

<script lang="ts">
import { orderItem } from "@/types/orderItem";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    //Store
    const store = useStore();

    //追加された商品の格納場所
    let cartList = Array<orderItem>();
    const defaultDisplay = () => {
      cartList = store.getters.getCartItemList;
      console.dir("カートリスト(cartList):" + JSON.stringify(cartList));
    };
    defaultDisplay();
    /**
     * カートから削除する.
     */
    let deleteOrderItem = (index: number) => {
      store.commit("deleteItem", {
        index: index,
      });

      cartList = store.getters.getCartItemList;
      console.dir(
        "カート削除ボタンクリック後の確認" + JSON.stringify(cartList)
      );
    };

    return {
      cartList,
      deleteOrderItem,
      defaultDisplay,
    };
  },
});
</script>

<style scoped>
/* ========================================
    ショッピングカートページのスタイル
   ======================================== */
.cart-table-th {
  text-align: center;
}
.cart-item-icon img {
  margin: auto;
  display: block;
  border-radius: 20px;
  width: 100px;
  height: 100px;
  padding: 0 0 15px 0;
}
.cart-item-name {
  text-align: center;
  font-size: 1.5rem;
}

.cart-total-price {
  font-size: 3rem;
  text-align: center;
}

.order-confirm-btn {
  text-align: center;
}

h1 {
  margin: 0;
}
</style>
