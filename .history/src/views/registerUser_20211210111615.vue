<template>
  <div class="top-wrap">
    <div class="container">
      <h1>会員登録</h1>
      <div class="row register-page">
        <div class="row">
          <div class="error">{{ errorMsgName }}</div>
          <div class="input-field col s6">
            <input
              id="last_name"
              type="text"
              class="validate"
              required
              v-model="lastname"
            />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input
              id="first_name"
              type="text"
              class="validate"
              required
              v-model="firstName"
            />
            <label for="first_name">名</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgMailAddress }}</div>
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              required
              v-model="emailAddress"
            />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgZipcode }}</div>
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" v-model="zipcode" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgAddress }}</div>
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgTel }}</div>
          <div class="input-field col s12">
            <input id="tel" type="tel" v-model="tel" />
            <label for="tel">電話番号</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgPassword }}</div>
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              minlength="8"
              required
              v-model="password"
            />
            <label for="password">パスワード</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgCheckedPassword }}</div>
          <div class="input-field col s12">
            <input
              id="confirmation_password"
              type="password"
              class="validate"
              minlength="8"
              required
              v-model="checkedPassword"
            />
            <label for="confirmation_password">確認用パスワード</label>
          </div>
        </div>
        <div class="row register-admin-btn">
          <button class="btn" type="button" v-on:click="errorCheck()">
            <span>登録</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";

export default defineComponent({
  setup() {
    //姓
    let lastName = ref("");
    //名
    let firstName = ref("");
    //メールアドレス
    let mailAddress = ref("");
    //郵便番号
    let zipcode = ref("");
    //住所
    let address = ref("");
    //電話番号
    let tel = ref("");
    //パスワード
    let password = ref("");
    //確認用パスワード
    let checkedPassword = ref("");

    //エラーメッセージ
    let errorMsgName = ref("");
    let errorMsgMailAddress = ref("");
    let errorMsgZipcode = ref("");
    let errorMsgAddress = ref("");
    let errorMsgTel = ref("");
    let errorMsgPassword = ref("");
    let errorMsgCheckedPassword = ref("");

    //エラーチェックフラグ
    let errorFlag = ref(false);

    /**
     * 各入力欄のエラーチェック.
     */
    let errorCheck = () => {
      //姓名のエラーチェック
      if (lastName.value === "" && firstName.value === "") {
        errorMsgName.value = "姓名を入力してください";
        errorFlag.value = true;
      } else if (lastName.value === "" || firstName.value === "") {
        errorMsgName.value = "姓または名を入力してください";
        errorFlag.value = true;
      } else {
        errorMsgName.value = "";
      }

      //メールアドレスのエラーチェック
      if (mailAddress.value === "") {
        errorMsgMailAddress.value = "メールアドレスを入力てください";
        errorFlag.value = true;
      } else if (mailAddress.value.indexOf("@") === -1) {
        errorMsgMailAddress.value = "正しいメールアドレスを入力してください";
        errorFlag.value = true;
      } else {
        errorMsgMailAddress.value = "";
      }

      //郵便番号のエラーチェック
      if (zipcode.value === "") {
        errorMsgZipcode.value = "郵便番号を入力してください";
        errorFlag.value = true;
      } else if (!zipcode.value.match(/[0-9]{7}/g)) {
        errorMsgZipcode.value = "数字7桁で入力してください";
        errorFlag.value = true;
      } else {
        errorMsgZipcode.value = "";
      }
      //住所のエラーチェック
      if (address.value === "") {
        errorMsgAddress.value = "住所を入力してください";
        errorFlag.value = true;
      }
      //電話番号のエラーチェック
      if (tel.value === "") {
        errorMsgTel.value = "電話番号を入力してください";
        errorFlag.value = true;
      } else if (!tel.value.match(/^[0-9]+$/)) {
        errorMsgTel.value = "数字で入力してください";
      } else {
        errorMsgTel.value = "";
      }
      if (password.value === "") {
        errorFlag.value = true;
      }
      if (checkedPassword.value === "") {
        errorFlag.value = true;
      }
    };

    return {
      lastName,
      firstName,
      mailAddress,
      zipcode,
      address,
      tel,
      password,
      checkedPassword,
      errorFlag,
      errorCheck,
      errorMsgName,
      errorMsgMailAddress,
      errorMsgZipcode,
      errorMsgAddress,
      errorMsgTel,
      errorMsgPassword,
      errorMsgCheckedPassword,
    };
  },
});
</script>

<style></style>
