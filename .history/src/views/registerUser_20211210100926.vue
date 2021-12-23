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

export default defineComponent({
  setup() {
    //姓
    let lastName = ref("");
    //名
    let firstName = ref("");
    //メールアドレス
    let mailAddress = ref("");
    //郵便番号
    let zipcode: number = ref();
    //住所
    let address = ref("");
    //電話番号
    let tel: number = ref();
    //パスワード
    let password = "";
    //確認用パスワード
    let checkedPassword = "";

    //エラーチェックフラグ
    let errorFlag = false;

    let errorCheck = () => {};

    return {
      lastName,
      firstName,
      mailAddress,
      zipcode,
      address,
      tel,
      password,
      checkedPassword,
      errorCheck,
    };
  },
});
</script>

<style></style>
