<template>
  <div class="sp-header">
    <ul>
      <li>
        <router-link to="/itemList">
          <i class="fas fa-utensils"></i> 商品一覧
        </router-link>
      </li>
      <li>
        <router-link to="/cartList">
          <i class="fas fa-shopping-cart"></i>カート
        </router-link>
      </li>
      <li>
        <router-link to="/registerUser">
          <i class="fas fa-user"></i>会員登録
        </router-link>
      </li>
      <li>
        <router-link to="/logoutUser" v-if="getloginStatus()">
          <i class="fas fa-sign-in-alt"></i>ログアウト
        </router-link>
      </li>
      <li>
        <router-link to="/loginUser" v-if="!getloginStatus()">
          <i class="fas fa-sign-in-alt"></i>ログイン
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./public/style.scss";
</style>
