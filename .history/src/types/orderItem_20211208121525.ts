import { orderTopping } from "./orderTopping";
import { Item } from "./item";

export class orderItem {
  constructor(
    //注文商品ID
    public _id: number,
    //商品ID
    public _itemId: number,
    //注文ID
    public _orderId: number,
    //数量
    public _quantity: number,
    //サイズ
    public _size: string,
    //商品
    public _item: Item,
    //注文トッピングリスト
    public _orderToppingList: Array<orderTopping>
  ) {}
  /**
   * 合計金額を表示
   * @param size
   * @param quantity
   * @param toppingQuantity
   * @returns
   */
  calcTotalPrice = (
    size: string,
    quantity: number,
    toppingQuantity: number
  ): number => {
    //サイズごとの商品の値段
    let sizePrice = 0;
    //サイズごとのトッピングの値段
    let toppingPrice = 0;
    //各サイズのトッピングの値段
    const mSizePrice = 200;
    const lSizePrice = 300;

    //商品サイズごとの値段
    if (size === "M") {
      sizePrice = this.item.priceM;
      toppingPrice = mSizePrice;
    } else if (size === "L") {
      sizePrice = this.item.priceL;
      toppingPrice = lSizePrice;
    }

    return (sizePrice + toppingPrice * toppingQuantity) * quantity;
  };

  /**
   * 商品の選択されたサイズごとに商品の値段を指定する.
   * @returns - 選択されているサイズの値段
   */
  // unitItemPrice = (): number => {
  //   let unitPrice = 0;
  //   if (this.size === "M") {
  //     unitPrice = this.item.priceM;
  //   } else if (this.size === "L") {
  //     unitPrice = this.item.priceL;
  //   }
  //   return unitPrice;
  // };

  /**
   * トッピングの値段を指定する.
   * @remarks サイズによって値段が異なるためその値段を条件分岐する
   * @returns - 選択されたサイズに合わせたトッピングの値段
   *
   */
  // toppingPrice = (selectSize: string): number => {
  //   let toppingPrice = 0;
  //   const mSizeTopping = 200;
  //   const lSizeTopping = 300;
  //   if (selectSize === "M") {
  //     toppingPrice = mSizeTopping;
  //   } else if (selectSize === "L") {
  //     toppingPrice = lSizeTopping;
  //   }
  //   return toppingPrice;
  // };

  /**
   * 合計金額を計算する（税抜き）.
   * @param size - 商品の選択されたサイズ
   * @param quantity - 数量
   * @param toppingQuantity - トッピングの数量
   *
   * @returns 合計金額（税抜き）
   */

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get itemId(): number {
    return this._itemId;
  }

  public set itemId(itemId: number) {
    this._itemId = itemId;
  }

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(orderId: number) {
    this._orderId = orderId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get size(): string {
    return this._size;
  }

  public set size(size: string) {
    this._size = size;
  }

  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
  }

  public get orderToppingList(): Array<orderTopping> {
    return this._orderToppingList;
  }

  public set orderToppingList(orderToppingList: Array<orderTopping>) {
    this._orderToppingList = orderToppingList;
  }
}
