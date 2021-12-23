<template>
  <div class="top-wrap">
    <div class="container">
      <h1>会員登録</h1>
      <div class="row register-page">
        <div class="error">エラーメッセージ</div>
        <div class="row">
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
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" v-model="zipcode" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="tel" type="tel" v-model="tel" />
            <label for="tel">電話番号</label>
          </div>
        </div>
        <div class="row">
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
          <button
            class="btn"
            type="button"
            onclick="location.href='login.html'"
          >
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
      if (lastName.value === "" && firstName.value === "") {
        errorMsgName.value = "姓名を入力してください";
        errorFlag.value = true;
      }
      if (lastName.value === "" || firstName.value === "") {
        errorMsgName.value = "姓または名を入力してください";
        errorFlag.value = true;
      }
      if (mailAddress.value === "") {
        errorFlag.value = true;
      }
      if (zipcode.value === "") {
        errorFlag.value = true;
      }
      if (address.value === "") {
        errorFlag.value = true;
      }
      if (tel.value === "") {
        errorFlag.value = true;
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
