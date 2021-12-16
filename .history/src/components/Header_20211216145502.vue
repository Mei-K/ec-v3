<template>
  <header>
    <!-- スマホ用ヘッダー -->
    <div div="sp-header" id="sp-app">
      <div class="sp-btn" v-on:click="openModal()">
        <i class="fas fa-bars"></i>
      </div>
      <transition name="fade">
        <HeaderModal
          v-if="showContent"
          v-on:close="closeModal()"
          v-bind:loginFlag="getloginStatus()"
        ></HeaderModal>
      </transition>
    </div>

    <!-- スマホ以外のヘッダー -->
    <div class="container">
      <div class="header-left logo">
        <router-link to="/top"> ALOHA cafe </router-link>
      </div>
      <div class="user-name-container" v-if="getloginStatus()">
        aloha!
        <span>{{ userName }} さん</span>
      </div>

      <div class="header-right">
        <router-link to="/itemList">
          <i class="fas fa-utensils"></i> 商品一覧
        </router-link>
        <router-link to="/cartList">
          <i class="fas fa-shopping-cart"></i>カート
        </router-link>
        <router-link to="/registerUser">
          <i class="fas fa-user"></i>会員登録
        </router-link>
        <router-link to="/logoutUser" v-if="getloginStatus()">
          <i class="fas fa-sign-in-alt"></i>ログアウト
        </router-link>
        <router-link to="/loginUser" v-if="!getloginStatus()">
          <i class="fas fa-sign-in-alt"></i>ログイン
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import HeaderModal from "./HeaderModal.vue";

export default defineComponent({
  components: {
    HeaderModal,
  },
  setup() {
    const store = useStore();
    //ログインしているユーザー名
    let userName = ref("");

    //モーダルクリックチェック
    let showContent = ref(false);

    //ログインステータス
    let loginUserStatus = false;

    /**
     * モーダルウィンドウを表示する.
     */
    let openModal = () => {
      showContent.value = true;
    };

    /**
     * モーダルウィンドを閉じる.
     */
    let closeModal = () => {
      showContent.value = false;
    };

    /**
     * ログイン状態を取得する.
     */
    let getloginStatus = () => {
      loginUserStatus = store.getters.getLoginStatus;
      return loginUserStatus;
    };

    let getLoginUserInfo = () => {
      let userInfo = store.getters.getLoginUserInfo;
      userName.value = userInfo._name;
    };

    getLoginUserInfo();

    return {
      getloginStatus,
      getLoginUserInfo,
      userName,
      showContent,
      openModal,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./public/style.scss";

header {
  font-size: 1.1rem;
  padding: 1rem 3rem;
  width: 100%;
  background-color: rgba(156, 174, 183, 0.5);
  position: fixed;
  box-sizing: border-box;
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */

  @include tablet {
    padding: 1rem 1rem;
  }
  @include sp {
    background-color: rgba(0, 0, 0, 0);
  }
}

.container {
  width: 100%;
  display: flex;
  padding: 0;
  justify-content: space-around;
  align-items: center;

  @include sp {
    display: none;
  }
}

.logo a {
  color: $header-font-color;

  &:hover {
    color: $navy;
  }
}

.header-left {
  width: 15%;
}

.header-right {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: end;

  @include tablet {
    width: 70%;
    margin: 0;
  }
}
.header-right a {
  padding: 0 1%;
  color: $header-font-color;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  /* float: left; */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */

  &:hover {
    color: $navy-hover;
  }
}

.user-name-container {
  width: 15%;
  font-size: 1rem;
  span {
    display: block;
  }
  @include tablet {
    width: 20%;
  }
}

//スマホ画面ヘッダー

#sp-app {
  display: none;
  @include sp {
    display: block;
  }
}
.sp-header {
  display: none;
  @include sp {
    width: 100%;
    display: flex;
    justify-content: end;
  }
}
.sp-btn {
  color: $navy;
  display: flex;
  justify-content: end;
}
i.fas.fa-bars {
  font-size: 3rem;
}

//モーダルの出現スピード  htmlの<transition>にて
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
