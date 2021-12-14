<template>
  <div class="home">
    <div class="top-img">
      <img
        src="/img_aloha/hawaii_top2.png"
        alt="アロハカフェのトップイメージ"
      />
    </div>
    <div class="top-title">
      <h1>E komo mai</h1>
    </div>
    <ul class="top-btn">
      <li>
        <button type="button" class="btn" v-on:click="showLoginUser()">
          ログイン
        </button>
      </li>
      <li>
        <button type="button" class="btn" v-on:click="showRegisterUser()">
          会員登録
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    let showRegisterUser = () => {
      router.push("/registerUser");
    };
    let showLoginUser = () => {
      router.push("/loginUser");
    };
    return {
      showRegisterUser,
      showLoginUser,
    };
  },
});
</script>

<style lang="scss" scoped>
@import ".../style.scss";
.home {
  width: 100%;
}
.top-img {
  position: relative;
  width: 100%;
  height: 100vh;

  img {
    width: 100%;
    height: 100vh;
  }
}

.top-title {
  position: absolute;
  font-family: "ff-market-web", "sans-serif";
  font-size: 8rem;
  z-index: 1;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.top-btn {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: 0 auto;
  justify-content: space-around;
}
</style>
