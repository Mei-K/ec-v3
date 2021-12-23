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
  font-size: 62.5%;
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
  text-align: center;
  font-size: 2.4rem;
}

#app .container {
  width: 100%;
  padding: 0;
  max-width: 1920px;
}
</style>
