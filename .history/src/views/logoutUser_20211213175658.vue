<template>
  <div>ログアウト中</div>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    let logout = () => {
      store.commit("logoutUser");
      console.dir(
        JSON.stringify(
          "ステートのログイン状態：" + store.getters.getLoginStatus
        )
      );
      router.push("/top");
    };
    logout();
    return {
      logout,
    };
  },
});
</script>

<style></style>
