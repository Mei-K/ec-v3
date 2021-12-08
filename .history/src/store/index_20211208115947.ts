import { createStore } from "vuex";
import { Item } from "../types/item";
import axios from "axios";
import { orderItem } from "@/types/orderItem";

export default createStore({
  strict: true,
  state: {
    //商品一覧
    itemList: new Array<Item>(),
    //カートリスト一覧(ショッピングカートに商品の格納場所)
    cartItemList: new Array<orderItem>(),
  },
  mutations: {
    /**
     * 商品一覧を表示する.
     * @remarks 外部APIから取得した商品詳細情報をステートの商品一覧配列に格納
     * @param state - ステートオブジェクト
     * @param payload - 外部リンクAPIから取得した商品詳細情報
     */
    getItemList(state, payload) {
      state.itemList = new Array<Item>();
      for (const item of payload.items) {
        state.itemList.push(
          new Item(
            item.id,
            item.string,
            item.name,
            item.description,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleteId,
            item.toppingList
          )
        );
      }
    },

    addCartToItem(state, payload) {
      state.cartItemList.push(
        new orderItem(
          state.cartItemList.length + 1, //カートリスト配列の個数に＋１したものがIDになる
          payload.orderitem.id, //商品自体のIDなのでorderItemでとってくる商品IDと同様
          payload.orderId,
          payload.quantity,
          payload.size,
          new Item(
            payload.orderitem.id,
            payload.orderitem.type,
            payload.orderitem.name,
            payload.orderitem.description,
            payload.orderitem.priceM,
            payload.orderitem.priceL,
            payload.orderitem.imagePath,
            payload.orderitem.deleteId,
            payload.toppingList
          ),
          payload.orderToppingList
        )
      );

      // console.dir("stateのcartItemList：" + JSON.stringify(state.cartItemList));
    },
  },
  actions: {
    /**
     * 商品一覧を取得.
     * @param context - コンテキスト
     * @param payload - 外部APIから取得したデータ
     */
    async getItemList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/aloha"
      );

      const payload = response.data;

      //ミューテーションのメソッド呼び出し
      context.commit("getItemList", payload);
    },
  },
  getters: {
    /**
     * 全商品一覧を取得.
     * @param state - ステートオブジェクト
     * @returns
     */
    getAllItemList(state) {
      // console.log("ステート：" + JSON.stringify(state));

      return state.itemList;
    },
    /**
     *全商品アイテム数
     * @param state - ステートオブジェクト
     * @returns
     */
    getAllitemCount(state) {
      return state.itemList.length;
    },

    /**
     * カートに追加した商品一覧を取得する.
     * @param state - ステートオブジェクト
     * @returns カートリスト
     */
    getCartItemList(state) {
      const cartItemList = Array<orderItem>();
      for (const cartItem of state.cartItemList) {
        cartItemList.push(
          new orderItem(
            cartItem._id,
            cartItem._itemId,
            cartItem._orderId,
            cartItem._quantity,
            cartItem._size,
            cartItem._item,
            cartItem._orderToppingList
          )
        );
      }
      return cartItemList;
    },
  },
  modules: {},
});
