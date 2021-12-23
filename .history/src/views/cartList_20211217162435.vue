<template>
  <div class="top-wrap">
    <div class="container">
      <!-- table -->
      <div class="row">
        <h1>ショッピングカート</h1>
        <CartList
          v-on:totalPrice="getcalcTotalPricePlusTax = $event"
        ></CartList>
        <ul class="button-container">
          <li class="row item-list-btn">
            <button class="btn" type="button" v-on:click="returnItemList()">
              <span>買い物を続ける</span>
            </button>
          </li>
          <li class="row order-confirm-btn">
            <button class="btn" type="button" v-on:click="orderConfirm()">
              <span>注文に進む</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- end container -->
  </div>
</template>

<script lang="ts">
import { orderItem } from "@/types/orderItem";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CartList from "../components/cartListComponent.vue";
export default defineComponent({
  components: { CartList },
  setup() {
    //Store
    const store = useStore();

    //Router
    const router = useRouter();

    //追加された商品の格納場所
    let cartList = ref(Array<orderItem>());

    //cartListComp(子コンポーネント)から税込合計金額を受けと得る
    let getcalcTotalPricePlusTax = ref(0);

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
      return TotalPricePlusTax;
    };
    /**
     * 商品位一覧に戻る.
     */
    let returnItemList = () => {
      router.push("/itemList");
    };
    /**
     * 注文画面に進む.
     */
    let orderConfirm = () => {
      if (store.getters.getLoginStatus === true) {
        console.log("合計（カートリスト）" + getcalcTotalPricePlusTax.value);
        router.push("/orderConfirm");
      } else if (store.getters.getLoginStatus === false) {
        router.push("/loginUser");
      }
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
      getcalcTotalPricePlusTax,
    };
  },
});
</script>

<style lang="scss" scoped>
/* ========================================
    ショッピングカートページのスタイル
   ======================================== */
.cart-table-th {
  text-align: center;
}
.cart-item-icon img {
  margin: auto;
  display: block;
  /* border-radius: 20px; */
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

.show-price {
  font-size: 2rem;
  &:first-child {
    margin-right: 2rem;
  }
}

.button-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  justify-content: center;

  &li {
    margin: 0;
    &:last-child {
      margin-right: 3rem;
    }
  }
}
</style>
