<template>
  <div class="top-wrap">
    <h1 class="page-title">注文内容確認</h1>
    <CartList v-on:totalPrice="getcalcTotalPricePlusTax = $event"></CartList>
    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <div class="row">
        <div class="error-msg">{{ errorMsgName }}</div>
        <div class="input-field">
          <input id="name" type="text" v-model="name" />

          <label for="name" class="active">お名前</label>
        </div>
      </div>
      <div class="row">
        <div class="error-msg">{{ errorMsgMailAddress }}</div>
        <div class="input-field">
          <input id="email" type="email" v-model="email" />
          <label for="email" class="active">メールアドレス</label>
        </div>
      </div>
      <div class="row">
        <div class="error-msg">{{ errorMsgZipcode }}</div>
        <div class="input-field">
          <input id="zipcode" type="text" maxlength="7" v-model="zipcode" />
          <label for="zipcode" class="active">郵便番号(ハイフンなし)</label>
          <button class="btn" type="button">
            <span>住所検索</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="error-msg">{{ errorMsgAddress }}</div>
        <div class="input-field">
          <input id="address" type="text" v-model="address" />
          <label for="address" class="active">住所</label>
        </div>
      </div>
      <div class="row">
        <div class="error-msg">{{ errorMsgTel }}</div>
        <div class="input-field">
          <input id="tel" type="tel" v-model="tel" />
          <label for="tel" class="active">電話番号</label>
        </div>
      </div>
      <div class="row order-confirm-delivery-datetime">
        <div class="error-msg">{{ errorMsgTime }}</div>
        <div class="input-field">
          <input id="deliveryDate" type="date" v-model="selectedDate" />
          <label for="address">配達日時</label>
        </div>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="11"
            v-model="selectedTime"
          />
          <span>11時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="12"
            v-model="selectedTime"
          />
          <span>12時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="13"
            v-model="selectedTime"
          />
          <span>13時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="14"
            v-model="selectedTime"
          />
          <span>14時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="15"
            v-model="selectedTime"
          />
          <span>15時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="16"
            v-model="selectedTime"
          />
          <span>16時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="17"
            v-model="selectedTime"
          />
          <span>17時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="18"
            v-model="selectedTime"
          />
          <span>18時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="19"
            v-model="selectedTime"
          />
          <span>19時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="20"
            v-model="selectedTime"
          />
          <span>20時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="21"
            v-model="selectedTime"
          />
          <span>21時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="22"
            v-model="selectedTime"
          />
          <span>22時</span>
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
            v-model="paymentMethod"
            checked="checked"
          />
          <span>代金引換</span>
        </label>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            value="2"
            v-model="paymentMethod"
          />
          <span>クレジットカード</span>
        </label>
      </span>
    </div>
    <div class="row order-confirm-btn">
      <button class="btn" type="button" v-on:click="order()">
        <span>この内容で注文する</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
// import { useStore } from "vuex";
import { defineComponent, ref } from "@vue/runtime-core";
import CartList from "../components/cartListComponent.vue";
import { format } from "date-fns";
import axios from "axios";
import { orderItem } from "@/types/orderItem";
import router from "@/router";
// import axios from "axios";
export default defineComponent({
  components: { CartList },

  setup() {
    // const store = useStore();
    //お届け先情報入力欄
    let name = ref("");
    let email = ref("");
    let zipcode = ref("");
    let address = ref("");
    let tel = ref("");
    //選択された配達日付
    let selectedDate = ref("");
    //選択された配達時間
    let selectedTime = ref("11");
    //今日の日付
    let today = new Date();
    //支払いステータス
    let paymentMethod = ref("1");

    //エラーメッセージ
    let errorMsgName = ref("");
    let errorMsgMailAddress = ref("");
    let errorMsgZipcode = ref("");
    let errorMsgAddress = ref("");
    let errorMsgTel = ref("");
    let errorMsgDate = ref("");
    let errorMsgTime = ref("");
    //cartListComp(子コンポーネント)から税込合計金額を受けと得る
    let getcalcTotalPricePlusTax = ref(0);
    //現在のカートリスト情報を格納する配列
    let currentOrderCartList = ref(new Array<orderItem>());

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
    getUserInfo();

    /**
     * 入力値エラーチェックする.
     */
    let errorCheck = () => {
      let errorFlag = ref(false);

      //名前入力チェック
      if (name.value === "") {
        errorFlag.value = true;
        errorMsgName.value = "名前を入力してください";
      } else {
        errorMsgName.value = "";
      }
      //メールアドレス入力チェック
      if (email.value === "") {
        errorFlag.value = true;
        errorMsgMailAddress.value = "メールアドレスを入力してください";
      } else {
        errorMsgAddress.value = "";
      }
      //郵便番号入力チェック
      if (zipcode.value === "") {
        errorFlag.value = true;
        errorMsgZipcode.value = "郵便番号を入力してください";
      } else if (!zipcode.value.match(/[0-9]{7}/g)) {
        errorFlag.value = true;
        errorMsgZipcode.value = "数字7桁で入力してください";
      } else {
        errorMsgZipcode.value = "";
      }
      //住所入力チェック
      if (address.value === "") {
        errorFlag.value = true;
        errorMsgAddress.value = "住所を入力してください";
      } else {
        errorMsgAddress.value = "";
      }
      //電話番号入力チェック
      if (tel.value === "") {
        errorFlag.value = true;
        errorMsgTel.value = "電話番号を入力してください";
      } else if (!tel.value.match(/^[0-9]+$/)) {
        errorFlag.value = true;
        errorMsgTel.value = "数字で入力してください";
      } else {
        errorMsgTel.value = "";
      }

      //配達日時のエラーチェック
      if (selectedTime.value === "" || selectedDate.value === "") {
        errorMsgTime.value = "配達日時を選択してください";
        errorFlag.value = true;
      }
      //現在から3時間後ではない配達時間が指定された場合はエラーメッセージを返す。
      //選択された配達日から年月日をそれぞれ取得する。
      const year = new Date(selectedDate.value).getFullYear();
      const month = new Date(selectedDate.value).getMonth();
      const date = new Date(selectedDate.value).getDate();
      const time = new Date(selectedTime.value).getHours();
      // //選択された配達日時と現在のDateオブジェクトを作成する。
      const SEELECT_DATE = new Date(year, month, date, time);

      // //現在から3時間後の日時が選択されているか、時間差をミリ秒で計算する。
      const enoughTimeToDeliver =
        (SEELECT_DATE.getTime() - today.getTime()) / (60 * 60 * 1000);
      // //時間差が3時間以下の場合はエラーメッセージを表示する。
      if (enoughTimeToDeliver <= 3) {
        errorMsgTime.value = "今から3時間後の日時を入力してください";
        errorFlag.value = true;
      }

      return errorFlag.value;
    };
    //日付選択チェック(１時間以内を選択してたら注文完了できない)

    /**
     * カートリストの中身
     * @remarks 注文情報をAPIに送るために現在のカートの中身の商品情報を取得する
     */

    /**
     * 注文する.
     * @remarks 1.APIに送る日付の加工 2.cartListの中身の商品情報,トッピング情報を取得
     *
     */
    let order = async () => {
      if (errorCheck() === true) {
        return;
      }

      //APIに送る用日付加工
      const NewDate_SEELECT_DATE = new Date(selectedDate.value);
      const Format_SELECT_DATE = format(
        NewDate_SEELECT_DATE,
        `yyyy/MM/dd ${selectedTime.value}:00:00`
      );
      console.log("APIに送る用日時" + Format_SELECT_DATE);

      //注文情報をAPIに送るために現在のカートの中身の商品情報を取得する
      currentOrderCartList.value = store.getters.getCartItemList;
      let orderToppingList = [];
      let orderItemList = [];
      //カートリストの商品のトッピング情報(トッピングID)をorderToppingListに格納
      for (let item of currentOrderCartList.value) {
        for (let topping of item.orderToppingList) {
          orderToppingList.push({ toppingId: topping.id });
        }
        orderItemList.push({
          itemId: item.id,
          orderId: item.orderId,
          quantity: item.quantity,
          size: item.size,
          orderToppingFormList: orderToppingList,
        });
      }
      const response = await axios.post(
        "http://153.127.48.168:8080/ecsite-api/order",
        {
          userId: 0,
          status: 1,
          totalPrice: getcalcTotalPricePlusTax.value,
          destinationName: name.value,
          destinationEmail: email.value,
          destinationZipcode: zipcode.value,
          destinationtel: tel.value,
          deliveryTime: Format_SELECT_DATE,
          paymentMethod: paymentMethod.value,
          orderItemFormList: orderItemList,
        }
      );
      if (response.data.status === "success") {
        router.push("/OrderFinished");
      } else if (response.data.status === "error") {
        return;
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
      errorMsgTime,
      selectedTime,
      getcalcTotalPricePlusTax,
      today,
      paymentMethod,
      order,

      currentOrderCartList,
    };
  },
});
</script>

<style lang="scss" scoped>
.error-msg {
  color: red;
}
</style>
