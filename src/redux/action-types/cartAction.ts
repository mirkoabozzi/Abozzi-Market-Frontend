import { ActionType } from "../enums/ActionType";

interface AddToCartAction {
  type: ActionType.ADD_TO_CART;
  payload: IItem;
}

interface RemoveFromCartAction {
  type: ActionType.REMOVE_FROM_CART;
  payload: IProduct;
}

interface UpdateQuantity {
  type: ActionType.UPDATE_QUANTITY;
  payload: {
    product: IProduct;
    quantity: number;
  };
}

interface ClearCart {
  type: ActionType.CLEAR_CART;
}

export type CartAction = AddToCartAction | RemoveFromCartAction | UpdateQuantity | ClearCart;
