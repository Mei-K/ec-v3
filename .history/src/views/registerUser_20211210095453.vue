<template>
  <div class="top-wrap">
    <div class="container">
      <h1>会員登録</h1>
      <div class="row register-page">
        <div class="error">エラーメッセージ</div>
        <div class="row">
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" required />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate" required />
            <label for="first_name">名</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" required />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="address" type="text" />
            <label for="address">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="tel" type="tel" />
            <label for="tel">電話番号</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              minlength="8"
              required
            />
            <label for="password">パスワード</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="confirmation_password"
              type="password"
              class="validate"
              minlength="8"
              required
            />
            <label for="confirmation_password">確認用パスワード</label>
          </div>
        </div>
        <div class="row register-admin-btn">
          <button
            class="btn"
            type="button"
            onclick="location.href='login.html'"
          >
            <span>登録</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
