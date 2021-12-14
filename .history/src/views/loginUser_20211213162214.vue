<template>
  <div class="top-wrap">
    <div class="container">
      <h1>ログイン</h1>
      <div class="row input-container">
        <div class="row">
          <div class="error">{{ errorMsgMailAddress }}</div>
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              required
              v-model="mailAddress"
            />
            <label for="email" class="active">メールアドレス</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({});
</script>

<style scoped></style>
