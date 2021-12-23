<template>
  <div id="overlay" v-on:click="closeModal()">
    <!-- v-show="showContent"  -->
    <div id="sp-content">
      <ul>
        <router-link to="/itemList">
          <li><i class="fas fa-utensils"></i> 商品一覧</li>
        </router-link>

        <router-link to="/cartList">
          <li><i class="fas fa-shopping-cart"></i>カート</li>
        </router-link>

        <router-link to="/registerUser">
          <li><i class="fas fa-user"></i>会員登録</li>
        </router-link>

        <router-link to="/logoutUser" v-if="loginCheck">
          <li><i class="fas fa-sign-in-alt"></i>ログアウト</li>
        </router-link>

        <router-link to="/loginUser" v-if="!loginCheck">
          <li><i class="fas fa-sign-in-alt"></i>ログイン</li>
        </router-link>
      </ul>
      <!-- <button v-on:click="closeModal()">close</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
// import { toRefs } from "vue";
export default defineComponent({
  props: {
    loginFlag: Boolean,
  },

  setup(props, context) {
    //ログインしているユーザー名
    let userName = ref("");
    //ログインフラグの受け取り
    let getLoginFlag = ref(false);

    /**
     * モーダルウィンドを閉じる.
     * @remarks このモーダルウィンドウの背景をclickしたらモーダルが閉じるメソッドを
     *          親コンポーネントで宣言しているメソットを呼んでる
     */
    let closeModal = () => {
      context.emit("close");
    };

    /**
     * ログインフラグの有無
     * @remarks true:ログイン,false:ログアウト
     */
    let loginCheck = () => {
      return (getLoginFlag.value = props.loginFlag);
    };

    return {
      userName,
      closeModal,
      loginCheck,
      getLoginFlag,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./public/style.scss";

.sp-header-container {
  display: none;
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
    height: 50vh;
    background-color: rgba(0, 0, 0, 0.8);

    //画面の中央に要素を表示させる設定
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.6s;
  }
  #sp-content {
    z-index: 2;
    width: 100%;
    padding: 1em;
    background: rgba(0, 0, 0, 0);

    a {
      color: white;
      font-size: 1.5rem;
    }
    ul {
      width: 50%;
      margin: 0 auto;
      text-align: center;
    }
    li {
      padding: 1rem;
      box-sizing: border-box;
    }
  }
  .fas {
    display: none;
  }
}
</style>
