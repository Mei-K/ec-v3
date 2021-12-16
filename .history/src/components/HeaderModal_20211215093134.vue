<template>
  <div class="sp-header">
    <router-link to="/itemList">
      <i class="fas fa-utensils"></i> 商品一覧
    </router-link>
    <router-link to="/cartList">
      <i class="fas fa-shopping-cart"></i>カート
    </router-link>
    <router-link to="/registerUser">
      <i class="fas fa-user"></i>会員登録
    </router-link>
    <router-link to="/logoutUser" v-if="getloginStatus()">
      <i class="fas fa-sign-in-alt"></i>ログアウト
    </router-link>
    <router-link to="/loginUser" v-if="!getloginStatus()">
      <i class="fas fa-sign-in-alt"></i>ログイン
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
