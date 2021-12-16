<template>
  <div class="top-wrap">
    <h1 class="page-title">注文内容確認</h1>
    <CartList></CartList>
    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <div class="row">
        <div class="input-field">
          <input id="name" type="text" v-model="name" />
          <label for="name" class="active">お名前</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="email" type="email" v-model="email" />
          <label for="email" class="active">メールアドレス</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="zipcode" type="text" maxlength="7" v-model="zipcode" />
          <label for="zipcode" class="active">郵便番号(ハイフンなし)</label>
          <button class="btn" type="button">
            <span>住所検索</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="address" type="text" v-model="address" />
          <label for="address" class="active">住所</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="tel" type="tel" v-model="tel" />
          <label for="tel" class="active">電話番号</label>
        </div>
      </div>
      <div class="row order-confirm-delivery-datetime">
        <div class="input-field">
          <input id="deliveryDate" type="date" v-model="checkedDate" />
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
import store from "@/store";
import { defineComponent, ref } from "@vue/runtime-core";
import CartList from "../components/cartListComponent.vue";
export default defineComponent({
  components: { CartList },
  setup() {
    //お届け先情報入力欄
    let name = ref("");
    let email = ref("");
    let zipcode = ref("");
    let address = ref("");
    let tel = ref("");
    let selectedDate = ref();

    //エラーメッセージ
    let errorMsgName = ref("");
    let errorMsgMailAddress = ref("");
    let errorMsgZipcode = ref("");
    let errorMsgAddress = ref("");
    let errorMsgTel = ref("");
    let errorMsgDate = ref("");

    /**
     * ログインユーザー情報で届け先入力欄に自動入力.
     */
    let getUserInfo = () => {
      const USER_INFO = store.getters.getLoginUserInfo;
      name.value = USER_INFO._name;
      email.value = USER_INFO._email;
      zipcode.value = USER_INFO._zipcode;
      address.value = USER_INFO._address;
      tel.value = USER_INFO._telephone;
    };

    /**
     * 入力値エラーチェックする.
     */
    let errorCheck = () => {
      let errorFlag = ref(false);

      if (name.value === "") {
        errorFlag.value = true;
        errorMsgName.value = "名前を入力してください";
      } else {
        errorMsgName.value = "";
      }

      if (email.value === "") {
        errorFlag.value = true;
        errorMsgMailAddress.value = "メールアドレスを入力してください";
      } else {
        errorMsgAddress.value = "";
      }

      if (zipcode.value === "") {
        errorMsgZipcode.value = "郵便番号を入力してください";
      } else {
        errorMsgZipcode = "";
      }
    };

    return {
      name,
      email,
      zipcode,
      address,
      tel,
      getUserInfo,
      selectedDate,
      errorCheck,
      errorMsgName,
      errorMsgMailAddress,
      errorMsgZipcode,
      errorMsgAddress,
      errorMsgTel,
      errorMsgDate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
