<template>
  <header>
    <div class="container">
      <div class="header-left logo">
        <router-link to="/"> Raku＊2 coffee </router-link>
      </div>

      <div class="header-right">
        <router-link to="/itemList">
          <i class="fas fa-utensils"></i> 商品一覧
        </router-link>
        <router-link to="/cartList">
          <i class="fas fa-shopping-cart"></i>カート
        </router-link>
        <router-link to="/contactCompany">
          <i class="fas fa-comment"></i>お問い合わせ
        </router-link>
        <router-link to="/registerUser">
          <i class="fas fa-user"></i>会員登録
        </router-link>
        <router-link to="/loginUser">
          <i class="fas fa-sign-in-alt"></i>ログイン
        </router-link>
        <router-link to="/logout">
          <i class="fas fa-sign-in-alt"></i>ログアウト
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  padding: 1%;
  width: 100%;
  background-color: #cab788;
  position: fixed; /* スクロールしてもヘッダが表示されるように位置を固定する */
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */
}

.container {
  width: 99%;
  display: flex;
  padding: 0;
  margin: 0;
}

.logo a {
  color: #332315;
}

.header-left {
  width: 15%;
}

.header-right {
  width: 80%;
  margin-left: auto; /* ヘッダ右側のリンクだけ右寄せにする(ロゴは左寄せのまま) */
  /* float: right; */
  display: flex; /* ヘッダ右側のリンクを横に並べる */
  justify-content: end;
}
.header-right a {
  padding: 0 1%;
  color: #9d8e87;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  /* float: left; */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */
}
.header-right a:hover {
  color: #332315;
}
/* fontawesome(ログインアイコンの設定) */
.fas {
  margin-right: 5px;
}
</style>
