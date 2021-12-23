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
    <div class="top-btn">
      <router-link class="btn">ログイン</router-link>

      <router-link to="/registerUser" class="btn">会員登録</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({});
</script>

<style scoped>
.home {
  width: 100%;
}
.top-img {
  position: relative;
  width: 100%;
  height: 100vh;
}
.top-img img {
  width: 100%;
  height: 100vh;
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
