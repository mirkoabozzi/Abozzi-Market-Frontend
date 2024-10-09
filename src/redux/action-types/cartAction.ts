import { ActionType } from "../enums/ActionType";

interface AddToCartAction {
  type: ActionType.ADD_TO_CART;
  payload: IItem;
}

interface RemoveFromCartAction {
  type: ActionType.REMOVE_FROM_CART;
  payload: IProduct;
}

interface IncreaseQuantityAction {
  type: ActionType.INCREASE_QUANTITY;
  payload: {
    product: IProduct;
    quantity: number;
  };
}

interface DecreaseQuantityAction {
  type: ActionType.DECREASE_QUANTITY;
  payload: {
    product: IProduct;
    quantity: number;
  };
}

export type CartAction = AddToCartAction | RemoveFromCartAction | IncreaseQuantityAction | DecreaseQuantityAction;
