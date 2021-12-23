<template>
  <div>ログアウト中</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    let logout = () => {
      router.push("/top");
    };
  },
});
</script>

<style></style>
