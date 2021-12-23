<template>
  <div>
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
</template>

<script lang="ts">
import { orderItem } from "@/types/orderItem";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup(props, context) {
    //Store
    const store = useStore();

    //Router
    const router = useRouter();

    //追加された商品の格納場所
    let cartList = ref(Array<orderItem>());

    /**
     * カートリストの中身を常に表示させる
     */
    const defaultDisplay = () => {
      cartList.value = store.getters.getCartItemList;
    };
    defaultDisplay();

    /**
     * カートから削除する.
     * @param index - 削除する商品の添字
     */
    let deleteOrderItem = (index: number) => {
      store.commit("deleteItem", {
        index: index,
      });
      cartList.value = store.getters.getCartItemList;
    };
    /**
     * カートリスト内合計金額（税抜き）を計算する.
     */
    let calcTotalPriceInCart = (): number => {
      let totalPriceInCart = 0;
      for (let orderItem of store.getters.getCartItemList) {
        totalPriceInCart += orderItem.calcTotalPrice(
          orderItem.size,
          orderItem.quantity,
          orderItem.orderToppingList.length
        );
      }
      return totalPriceInCart;
    };
    /**
     * カート内の合計金額の消費税を計算する.
     */
    let calcTotalTaxPriceInCart = () => {
      const TAX = 0.1;
      let taxTotal = 0;
      taxTotal = calcTotalPriceInCart() * TAX;
      return taxTotal;
    };
    /**
     * カート内の合計金額と消費税の合計を計算する.
     */
    let calcTotalPricePlusTax = () => {
      let TotalPricePlusTax = 0;
      TotalPricePlusTax = calcTotalPriceInCart() + calcTotalTaxPriceInCart();
      context.emit("totalPrice", TotalPricePlusTax);
      return TotalPricePlusTax;
    };
    /**
     * 商品位一覧に戻る.
     */
    let returnItemList = () => {
      router.push("/itemList");
    };

    let orderConfirm = () => {
      router.push("/orderConfirm");
    };

    return {
      cartList,
      deleteOrderItem,
      defaultDisplay,
      calcTotalPriceInCart,
      calcTotalTaxPriceInCart,
      calcTotalPricePlusTax,
      returnItemList,
      orderConfirm,
    };
  },
});
</script>

<style></style>
