<template>
  <div class="container">
    <div class="item-wrapper">
      <div class="items">
        <div class="item" v-for="item of itemList" v-bind:key="item.id">
          <div class="item-icon">
            <router-link to="'/itemDetail/' +item.id"
              ><img :src="item.imagePath" />
            </router-link>
          </div>

          <router-link :to="'/itemDtail/' + item.id">
            {{ item.name }}
          </router-link>
          <br />
          <span class="price">Ｍ</span>{{ item.priceM }}<br />
          <span class="price">Ｌ</span>{{ item.priceL }}<br />
        </div>
      </div>
      <!-- ページングボタン (機能していない)-->
      <div v-for="page of pageNumArray" v-bind:key="page">
        <button type="button">テスト</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Item } from "../types/item";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    //VueX store
    const store = useStore();

    //現在の商品一覧を格納する配列
    let itemList = ref(Array<Item>());

    //ページボタンナンバー
    let pageNumArray = ref(Array<number>());

    /**
     * 全商品一覧を取得
     *
     *
     */
    const getAllItem = async () => {
      await store.dispatch("getItemList");
      console.dir("JSONデータ:" + JSON.stringify(store.getters.getAllItemList));
      itemList.value = store.getters.getAllItemList;
    };
    getAllItem();

    /**
     * ページングボタンを作りたい・・・
     */
    let arrayPageNum = () => {
      let num1 = Math.ceil(itemList.value.length / 6);
      console.log("num1:" + num1);

      console.log("geetersの全商品数メソッド" + store.getters.getAllitemCount);
      console.log("ページボタン計算" + pageNumArray.value);
    };
    arrayPageNum();

    return {
      store,
      itemList,
      arrayPageNum,
    };
  },
});
</script>
<style scoped>
.search-wrapper {
  padding: 80px 0 50px 0; /*上はヘッダが来るのでその分180px分空ける*/
  /* text-align: center; */
  position: fixed; /* スクロールしても表示されるように位置を固定 */
  height: 180px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1; /* 上に表示されるようにする(数が多いほど上に来る。例えば-1にすると裏側に行き見えなくなります) */
}

.search-form {
  margin: auto; /*検索窓を中央に配置*/
  width: 40%;
  text-align: center;
}

.search-name-input {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  /* display: block; */
  width: 30%;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: inherit;
  margin: 0;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
}

.search-btn {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

/* ========================================
    item-wrapperの設定
   ======================================== */

.item-wrapper {
  width: 100%;
  background-color: #f7f7f7;
  text-align: center;
}

.items {
  display: flex;
  flex-wrap: wrap; /* 表示内容が多かった時に自動的に複数行に分割される */
}

.item {
  width: 32%;
  padding: 2rem 2rem 0;
  margin: 0 0 2rem 0;
}

.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 200px;
  height: 200px;
  padding: 0 0 15px 0;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
}
</style>
