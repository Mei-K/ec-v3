<template>
  <div id="overlay">
    <!-- v-show="showContent" v-on:click="closeModal()" -->
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
          <router-link to="/logoutUser">
            <i class="fas fa-sign-in-alt"></i>ログアウト
          </router-link>
        </li>
        <li>
          <router-link to="/loginUser">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
        </li>
      </ul>
      <button v-on:click="closeModal()">close</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
export default defineComponent({
  props: [],
  setup(props, context) {
    //ログインしているユーザー名
    let userName = ref("");

    //モーダルクリックチェック
    let showContent = ref(false);

    /**
     * モーダルウィンドを閉じる.
     */
    let closeModal = () => {
      context.emit("close");
      showContent.value = false;
    };

    return {
      userName,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./public/style.scss";

.sp-header-container {
  //   display: none;
  //スマホ画面サイズの時のみ表示される
  @include sp {
    width: 100%;
    height: 40vh;
  }
}

@include sp {
  #overlay {
    //要素を重ねた時の順番
    z-index: 1;

    //画面全体を覆う設定
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background-color: rgba(0, 0, 0, 0.5);

    //画面の中央に要素を表示させる設定
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #sp-content {
    z-index: 2;
    width: 50%;
    padding: 1em;
    background: #fff;
  }
}
</style>
