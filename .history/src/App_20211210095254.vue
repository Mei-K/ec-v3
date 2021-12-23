<template>
  <div>
    <Header></Header>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
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
#app h1 {
  padding: 0;
  margin: 2rem 0;
  text-align: center;
  font-size: 2rem;
}

#app .container {
  width: 100%;
  padding: 0;
  max-width: 1920px;
}

#app td,
th {
  font-size: 1rem;
}
</style>
