<template>
  <div class="top-wrap">
    <div class="container">
      <h1>ログイン</h1>
      <div class="row input-container">
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
        <button class="btn" type="button" v-on:click="login()">
          <span>ログイン</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    //メールアドレス
    let mailAddress = ref("");
    //パスワード
    let password = ref("");

    //エラーメッセージ
    let errorMsgMailAddress = ref("");
    let errorMsgPassword = ref("");

    let login = async () => {
      const response = await axios.post(
        "http://153.127.48.168:8080/ecsite-api/user/login",
        {
          email: mailAddress.value,
          password: password.value,
        }
      );
      console.dir("レスポンス:" + JSON.stringify(response.data));

      //入力値チェック
      let errorFlag: Boolean = false;
      if (mailAddress.value === "") {
        errorMsgMailAddress.value = "メールアドレスを入力してください";
        this.errorFlag = true;
      } else {
        errorMsgMailAddress.value = "";
      }

      if (response.data.status === "success") {
        store.commit("loginUser");
        router.push("/itemList");
      }
    };

    return {
      login,
      mailAddress,
      password,
      errorMsgMailAddress,
      errorMsgPassword,
    };
  },
});
</script>

<style scoped></style>
