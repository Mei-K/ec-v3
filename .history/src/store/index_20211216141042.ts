import { createStore } from "vuex";
import { Item } from "../types/item";
import axios from "axios";
import { orderItem } from "@/types/orderItem";
import createPersistedState from "vuex-persistedstate";
import { loginUser } from "@/types/loginUser";

export default createStore({
  strict: true,
  state: {
    //商品一覧
    itemList: new Array<Item>(),
    //カートリスト一覧(ショッピングカートに商品の格納場所)
    cartItemList: new Array<orderItem>(),
    //ログインステータス （ログイン/true , ログアウト/false）
    isLogin: false,
    //ログインしているユーザーの情報
    loginUser: new loginUser("", "", 0, 0, "", 0),
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
    /**
     * カートに商品を追加する.
     * @param state - ステートオブジェクト
     * @param payload
     */
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
    /**
     * カートから商品を削除する.
     * @param state - ステートオブジェクト
     * @param payload - カートから削除する商品の情報
     */
    deleteItem(state, payload) {
      state.cartItemList.splice(payload.index, 1);
    },
    /**
     *ログイン状態にする.
     * @param state - ステートオブジェクト
     */
    loginUser(state) {
      state.isLogin = true;
    },
    /**
     *ログアウト状態にする.
     * @param state - ステートオブジェクト
     */
    logoutUser(state) {
      state.isLogin = false;
    },
    /**
     * ログインしているユーザー情報を取得をステートに格納
     * @param state
     * @param payload
     */
    getLoginUserInfo(state, payload) {
      state.loginUser = new loginUser(
        payload.name,
        payload.email,
        payload.password,
        payload.zipcode,
        payload.address,
        payload.telephone
      );
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

    /**
     * ログインしているユーザーの情報を取得.
     * @param context - コンテキスト
     */
    async getLoginUserInfo(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/user/login"
      );
      const payload = response.data;
      context.commit("getLoginUserInfo", payload);
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
            0,
            cartItem._quantity,
            cartItem._size,
            new Item(
              cartItem._item._id,
              cartItem._item._type,
              cartItem._item._name,
              cartItem._item._description,
              cartItem._item._priceM,
              cartItem._item._priceL,
              cartItem._item._imagePath,
              cartItem._item._deleteId,
              cartItem._item._toppingList
            ),
            cartItem._orderToppingList
          )
        );
      }
      return cartItemList;
    },
    /**
     * ログイン状態を取得する.
     * @param state - ステートオブジェクト
     * @returns 現在のログイン状態
     */
    getLoginStatus(state) {
      return state.isLogin;
    },
    /**
     *ログインしているユーザーの情報を取得
     * @param state - ステートオブジェクト
     * @returns
     */
    getLoginUserInfo(state) {
      return state.loginUser;
    },

    getOrderItemCountInCart(state) {
      return state.cartItemList.length;
    },
  },
  modules: {},

  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vue",
      //ステートのデータをセッションストレージに格納しブラウザ更新しても残るようにしている
      paths: ["cartItemList", "isLogin", "loginUser"],
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ],
});
