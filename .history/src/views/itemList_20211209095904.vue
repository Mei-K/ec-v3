<template>
  <div class="top-wrap">
    <div class="container">
      <div class="item-wrapper">
        <div class="items">
          <div class="item" v-for="item of itemList" v-bind:key="item.id">
            <router-link to="'/itemDetail/' +item.id">
              <div class="item-icon">
                <img :src="item.imagePath" />
              </div>
            </router-link>
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
    let arrayPageNum = () => {

    };
  },
});
</script>
<style scoped></style>
