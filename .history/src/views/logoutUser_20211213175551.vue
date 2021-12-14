<template>
  <div>ログアウト中</div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    let logout = () => {
      store.commit("logoutUser");
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
