<template>
  <div class="top-wrap">
    <div class="container">
      <h1 class="page-title">{{ currentOrderItem.item.name }}</h1>
      <div class="row">
        <div class="row item-detail">
          <div class="item-icon">
            <img :src="currentOrderItem.item.imagePath" />
          </div>
          <div class="item-intro">
            {{ currentOrderItem.item.description }}
          </div>
        </div>
        <div class="row item-size">
          <div class="item-hedding">サイズ</div>
          <div>
            <label>
              <input
                id="size-m"
                name="selectSize"
                type="radio"
                checked="checked"
                value="M"
                v-model="selectSize"
              />
              <span>
                &nbsp;<span class="price">Ｍ</span
                >{{ currentOrderItem.item.priceM }}円(税抜)</span
              >
            </label>
            <label>
              <input
                id="size-l"
                name="selectSize"
                type="radio"
                value="L"
                v-model="selectSize"
              />
              <span>
                &nbsp;<span class="price">Ｌ</span
                >{{ currentOrderItem.item.priceL }}円(税抜)</span
              >
            </label>
          </div>
        </div>

        <div class="row item-toppings">
          <div class="item-hedding">
            トッピング：&nbsp;1つにつき
            <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
            <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
          </div>
          <div class="topping-container">
            <div
              class="topping-item-container"
              v-for="toppingItem of currentOrderItem.item.toppingList"
              v-bind:key="toppingItem.id"
            >
              <label class="item-topping">
                <input
                  type="checkbox"
                  v-bind:value="toppingItem.id"
                  v-model="checkFlag"
                />
                <span>{{ toppingItem.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="row item-quantity">
          <div class="item-hedding item-hedding-quantity">数量</div>
          <div class="item-quantity-selectbox">
            <div class="input-field col s12">
              <select v-model="quantity">
                <option value="" disabled selected>選択して下さい</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row item-total-price">
          <span
            >この商品金額：{{
              currentOrderItem.calcTotalPrice(
                selectSize,
                quantity,
                selectedToppings.length
              )
            }}
            円(税抜)</span
          >
        </div>
        <div class="row item-cart-btn">
          <button class="btn" type="button" v-on:click="addItemToCart">
            <span>カートに入れる</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Item } from "../types/item";
import axios from "axios";
import { Topping } from "../types/Topping";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { orderItem } from "@/types/orderItem";
import { orderTopping } from "@/types/orderTopping";

export default defineComponent({
  setup() {
    //Route
    const route = useRoute();
    //Router
    const router = useRouter();
    //Store
    const store = useStore();

    //チェックされたトッピングを格納する配列
    let selectedToppings = ref(new Array<Topping>());
    //トッピング選択のcheckFlag
    let checkFlag = false;

    //商品個数
    let quantity = ref(1);
    //選択されているサイズ
    let selectSize = ref("M");

    //現在表示されている商品を注文商品（orderItem）を初期化
    let currentOrderItem = ref(
      new orderItem(
        0,
        0,
        0,
        0,
        "M",
        new Item(
          0,
          "type",
          "name",
          "description",
          0,
          0,
          "image",
          false,
          Array<Topping>()
        ),
        Array<orderTopping>()
      )
    );

    /**
     * params.idから商品詳細を取得.
     * @remarks APIからparamsIDを経由して取得した商品情報詳細を
     *          Itemオブジェクトにインスタンス化している
     *
     */
    let getItemDetail = async () => {
      const itemID = route.params.id;
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/" + itemID
      );
      console.dir("responseデータ：" + JSON.stringify(response));
      //商品詳細を表示
      currentOrderItem.value = new orderItem(
        0,
        0,
        0,
        0,
        "M",
        new Item(
          response.data.item.id,
          response.data.item.type,
          response.data.item.name,
          response.data.item.description,
          response.data.item.priceM,
          response.data.item.priceL,
          response.data.item.imagePath,
          response.data.item.deleteId,
          response.data.item.toppingList
        ),
        Array<orderTopping>()
      );
    };
    getItemDetail();

    /**
     * 選択されたトッピングを格納する
     *
     */

    let addTopping = () => {

      if()
    };

    /**
     * カートリストに画面遷移
     *
     */
    let addItemToCart = (): void => {
      router.push("/cartList");
      store.commit("addCartToItem", {
        quantity: quantity.value,
        size: selectSize.value,
        orderitem: {
          id: currentOrderItem.value.item.id,
          type: currentOrderItem.value.item.type,
          name: currentOrderItem.value.item.name,
          description: currentOrderItem.value.item.description,
          priceM: currentOrderItem.value.item.priceM,
          priceL: currentOrderItem.value.item.priceL,
          imagePath: currentOrderItem.value.item.imagePath,
          deleteId: currentOrderItem.value.item.deleteId,
          toppingList: currentOrderItem.value.item.toppingList,
        },
        orderToppingList: selectedToppings.value,
      });
    };

    return {
      selectSize,
      addItemToCart,
      selectedToppings,
      quantity,
      currentOrderItem,
      getItemDetail,
    };
  },
});
</script>

<style scoped>
/* ========================================
    商品詳細ページのスタイル
   ======================================== */

.page-title {
  text-align: center;
}

.item-detail {
  display: flex;
  /* 中央揃え */
  justify-content: center;
}
.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 250px;
  height: 250px;
  padding: 0 0 15px 0;
}

.item-intro {
  width: 400px;
  padding-top: 50px;
  padding-left: 50px;
  font-size: 20px;
}

.item-hedding {
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}
.item-size {
  /* text-align: center; */
  font-size: 15px;
  margin-bottom: 20px;
  padding: 0 200px 0 200px;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
  color: black;
}

.item-toppings {
  font-size: 15px;
  padding: 0 200px 0 200px;
}

.item-topping {
  margin-right: 10px;
}

.item-hedding-quantity {
  margin-left: 200px;
}

.item-quantity {
  text-align: center;
  font-size: 15px;
}

.item-quantity-selectbox {
  padding: 0 300px 0 300px;
}

.item-total-price {
  font-size: 35px;
  text-align: center;
}

.item-cart-btn {
  text-align: center;
}

.topping-container {
  display: flex;
  width: 60%;
}

.topping-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 1.5rem;
}

.topping-item-container {
  width: 30%;
}
</style>
