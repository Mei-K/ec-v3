<template>
  <div class="top-wrap">
    <h1 class="page-title">注文内容確認</h1>
    <CartList></CartList>
    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <div class="row">
        <div class="input-field">
          <input id="name" type="text" />
          <label for="name">お名前</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="email" type="email" />
          <label for="email">メールアドレス</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="zipcode" type="text" maxlength="7" />
          <label for="zipcode">郵便番号(ハイフンなし)</label>
          <button class="btn" type="button">
            <span>住所検索</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="address" type="text" />
          <label for="address">住所</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="tel" type="tel" />
          <label for="tel">電話番号</label>
        </div>
      </div>
      <div class="row order-confirm-delivery-datetime">
        <div class="input-field">
          <input id="deliveryDate" type="date" />
          <label for="address">配達日時</label>
        </div>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="10時"
            checked="checked"
          />
          <span>10時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="11時" />
          <span>11時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="12時" />
          <span>12時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="13時" />
          <span>13時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="14時" />
          <span>14時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="15時" />
          <span>15時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="16時" />
          <span>16時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="17時" />
          <span>17時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input name="deliveryTime" type="radio" value="18時" />
          <span>18時</span>
        </label>
      </div>
    </div>

    <h2 class="page-title">お支払い方法</h2>
    <div class="row order-confirm-payment-method">
      <span>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            value="1"
            checked="checked"
          />
          <span>代金引換</span>
        </label>
        <label class="order-confirm-payment-method-radio">
          <input name="paymentMethod" type="radio" value="2" />
          <span>クレジットカード</span>
        </label>
      </span>
    </div>
    <div class="row order-confirm-btn">
      <button
        class="btn"
        type="button"
        onclick="location.href='order_finished.html'"
      >
        <span>この内容で注文する</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import CartList from "../components/cartListComponent.vue";
export default defineComponent({
  components: { CartList },
  setup() {
    //お届け先情報入力欄

    let lastName = ref("");
    let firstName = ref("");
    let mailAddress = ref("");
    let zipcode = ref("");
    let address = ref("");
    let tel = ref("");
  },
});
</script>

<style lang="scss" scoped></style>
