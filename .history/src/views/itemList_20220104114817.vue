<template>
  <div class="top-wrap">
    <div class="container">
      <!-- <div class="item-wrapper"> -->
      <h1>商品一覧</h1>
      <div class="items">
        <div class="item" v-for="item of itemList" v-bind:key="item.id">
          <div class="item-icon">
            <router-link :to="'/itemDtail/' + item.id"
              ><img :src="item.imagePath" />
            </router-link>
          </div>
          <div class="item-bottom-c">
            <div class="link-name">
              <router-link :to="'/itemDtail/' + item.id">
                {{ item.name }}
              </router-link>
            </div>

            <ul class="price-container">
              <li>
                <span class="price">M</span>{{ item.priceM.toLocaleString() }}
              </li>
              <li>
                <span class="price">L</span>{{ item.priceL.toLocaleString() }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- ページングボタン (機能していない)-->
      <div v-for="page of pageNumArray" v-bind:key="page">
        <button type="button">テスト</button>
      </div>
      <!-- </div> -->
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
    //ページ数
    let pageNum = ref(0);

    /**
     * 全商品一覧を取得
     *
     *
     */
    const getAllItem = async () => {
      await store.dispatch("getItemList");
      itemList.value = store.getters.getAllItemList;
      console.log("アイテム数length" + itemList.value.length);
    };
    getAllItem();

    /**
     * ページングボタンを作りたい・・・
     */
    const getShowPage = () => {
      console.log("getShowPageのアイテム数" + itemList.value.length);
      pageNum.value = Math.ceil(itemList.value.length / 6);
      console.log("getShowPageの" + pageNum.value);
    };
    getShowPage();

    return {
      store,
      itemList,
      pageNum,
      getAllItem,
      getShowPage,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./public/style.scss";

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
  padding-top: 15rem;
  background-color: #f7f7f7;
  text-align: center;
}

.top-wrap {
  background-color: #f7f7f7;
  text-align: center;
}

.items {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
}

@media (max-width: 768px) {
  .items {
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    margin: 0 auto;
    justify-content: center;
  }
}

.item {
  width: 30%;
  padding: 0 0 1rem 0;
  margin: 0 1rem 1rem 0;
  background-color: #ebf6f7;
  box-sizing: border-box;

  @include sp {
    width: 45%;
    padding: 1rem;
    margin: 0 1rem 1rem 0;
  }
}

.link-name {
  width: 100%;
  box-sizing: border-box;
  margin: 1rem 0;
  &a {
    font-size: 1.2rem;
    color: $navy;
  }

  @include sp {
    font-size: 1rem;
  }
}

.item-icon {
  width: 99%;
  height: 14rem;
  margin: 0 auto;
  overflow: hidden;

  img {
    max-width: 100%;
    width: 100%;
    height: 14rem;
    object-fit: cover;
    transition-duration: 0.5s;

    &:hover {
      transform: scale(1.1);
      transition-duration: 0.5s;
      opacity: 0.6;
    }
  }

  @include sp {
    img {
      margin: auto;
      display: block;
      border-radius: 20px;
      width: 99%;
      height: 13rem;
      box-sizing: border-box;
    }
  }
}

.price-container {
  display: flex;
  width: 70%;
  margin: 0 auto;
  justify-content: center;
  font-size: 1rem;
}

.price-container li {
  width: 50%;
  text-align: center;
}

$orange: #f0e68c;
$blue: #192f60;

/* サイズをオレンジ〇で囲む */
.price {
  color: $blue;
  background-color: $orange;
  border-radius: 50%; /* 角丸にする設定 */
}

.item-bottom-c {
  display: flex;
  flex-direction: column;
  align-content: stretch;
}
</style>
