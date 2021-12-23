<template>
  <div id="overlay" v-show="showContent" v-on:click="closeModal()">
    <div id="sp-content">
      <ul>
        <li>
          <router-link to="/itemList">
            <i class="fas fa-utensils"></i> 商品一覧
          </router-link>
        </li>
        <li>
          <router-link to="/cartList">
            <i class="fas fa-shopping-cart"></i>カート
          </router-link>
        </li>
        <li>
          <router-link to="/registerUser">
            <i class="fas fa-user"></i>会員登録
          </router-link>
        </li>
        <li>
          <router-link to="/logoutUser" v-if="getloginStatus()">
            <i class="fas fa-sign-in-alt"></i>ログアウト
          </router-link>
        </li>
        <li>
          <router-link to="/loginUser" v-if="!getloginStatus()">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
        </li>
      </ul>
      <button v-on:click="closeModal()">close</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent class HeaderModal({});
</script>

<style lang="scss" scoped>
@import "./public/style.scss";

.sp-header-container {
  display: none;
  //スマホ画面サイズの時のみ表示される
  @include sp {
    width: 100%;
    height: 100vh;
  }
}
</style>
