<template>
  <div>
    <Header1></Header1>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header1 from "./components/Header.vue";

export default defineComponent({
  components: {
    Header1,
  },
});
</script>
<style>
html {
  font-size: 62.5%;
}
body {
  margin: 0;
  padding: 0;
}

a {
  color: black;
}

.top-wrap {
  padding-top: 8%;
}
h1 {
  padding: 0;
  margin: 0;
}
</style>
