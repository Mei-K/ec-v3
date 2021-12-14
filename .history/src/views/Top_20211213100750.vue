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
      <button type="button">ログイン</button>
      <button type="button">会員登録</button>
    </ul>
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
</style>
