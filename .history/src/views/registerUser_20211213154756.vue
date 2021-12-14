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
              v-model="lastName"
            />
            <label for="last_name" class="active">姓</label>
          </div>
          <div class="input-field col s6">
            <input
              id="first_name"
              type="text"
              class="validate"
              placeholder=""
              required
              v-model="firstName"
            />
            <label for="first_name" class="active">名</label>
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
              v-model="mailAddress"
            />
            <label for="email" class="active">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgZipcode }}</div>
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" v-model="zipcode" />
            <label for="zipcode" class="active">郵便番号(ハイフンなし)</label>
            <button
              class="btn"
              type="button"
              v-on:click="getAddressByZipcode()"
            >
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgAddress }}</div>
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address" class="active">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorMsgTel }}</div>
          <div class="input-field col s12">
            <input id="tel" type="tel" v-model="tel" maxlength="11" />
            <label for="tel" class="active">電話番号</label>
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
            <label for="password" class="active">パスワード</label>
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
            <label for="confirmation_password" class="active"
              >確認用パスワード</label
            >
          </div>
        </div>
        <ul class="btn-container">
          <li>
            <button class="btn" type="button" v-on:click="registerUser()">
              <span>登録</span>
            </button>
          </li>
          <li>
            <button class="btn" type="button" v-on:click="inputClear()">
              <span>クリア</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

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

    /**
     * 入力内容、エラーメッセージをクリアする.
     */
    let inputClear = () => {
      lastName.value = "";
      firstName.value = "";
      mailAddress.value = "";
      zipcode.value = "";
      address.value = "";
      tel.value = "";
      password.value = "";
      checkedPassword.value = "";
      errorMsgName.value = "";
      errorMsgMailAddress.value = "";
      errorMsgZipcode.value = "";
      errorMsgAddress.value = "";
      errorMsgTel.value = "";
      errorMsgPassword.value = "";
      errorMsgCheckedPassword.value = "";
    };

    /**
     * 各入力欄のエラーチェック.
     */
    let errorCheck = (): boolean => {
      //エラーチェックフラグ
      let errorFlag = ref(false);

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
      } else {
        errorMsgAddress.value = "";
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

      //パスワードのエラーチェック
      if (password.value === "") {
        errorMsgPassword.value = "パスワードを入力してください";
        errorFlag.value = true;
      }

      //確認用パスワード
      //半角大小英数字      /^([a-zA-Z0-9]{8,12})$/
      if (checkedPassword.value === "") {
        errorMsgCheckedPassword.value = "確認用パスワードを入力してください";
        errorFlag.value = true;
      } else if (!checkedPassword.value.match(/^([a-zA-Z0-9]{8,12})+$/)) {
        errorMsgPassword.value =
          "半角大小英数字、8文字以上12文字以下で入力してください";
        errorFlag.value = true;
      } else {
        errorMsgPassword.value = "";
      }

      if (password.value != checkedPassword.value) {
        errorMsgCheckedPassword.value = "パスワードが一致しません";
        errorFlag.value = true;
      } else if (password.value === checkedPassword.value) {
        errorMsgCheckedPassword.value = "";
      }

      return errorFlag;
    };

    /**
     * 会員登録をする
     */
    let registerUser = async () => {
      //エラーチェック
      if (errorCheck()) {
        return;
      }

      //APIに情報渡して会員登録をする
      const response = await axios.post(
        "http://153.127.48.168:8080/ecsite-api/user",
        {
          name: lastName.value + firstName.value,
          email: mailAddress.value,
          password: password.value,
          zipcode: zipcode.value,
          address: address.value,
          telephone: tel.value,
        }
      );
      console.dir("responseステータス:" + JSON.stringify(response.data.status));
      console.dir(
        "responseメッセージ:" + JSON.stringify(response.data.message)
      );

      //登録成功したらログイン画面に遷移する
      if (response.data.status === "success") {
        router.push("/top");
      }
    };

    /**
     * 郵便番号から住所を検索する.
     */
    let getAddressByZipcode = async () => {
      errorMsgZipcode.value = "";
      //npm install --save-dev axios-jsonp  をインストールする
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axiosJsonpAdapter = require("axios-jsonp");
      if (zipcode.value.match(/[0-9]{7}/g)) {
        const response = await axios.get("https://zipcoda.net/api", {
          adapter: axiosJsonpAdapter,
          params: {
            zipcode: zipcode.value,
          },
        });
        address.value = response.data.items[0].components.join("");
      } else {
        errorMsgZipcode.value = "数字7桁で入力してください";
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
      errorCheck,
      errorMsgName,
      errorMsgMailAddress,
      errorMsgZipcode,
      errorMsgAddress,
      errorMsgTel,
      errorMsgPassword,
      errorMsgCheckedPassword,
      inputClear,
      getAddressByZipcode,
      registerUser,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
}

.register-page {
  width: 70%;
  margin: 0 auto;
  background-color: rgba(200, 194, 198, 0.3);
  padding: 4rem 2rem;
  box-sizing: border-box;
}

.btn-container {
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: 0 auto;
  justify-content: space-around;
}
</style>
