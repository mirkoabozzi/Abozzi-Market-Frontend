import { CartAction } from "../action-types/cartAction";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  content: IItem[];
}

const initialState: InitialState = {
  content: [],
};

const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    case ActionType.REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((item: IItem) => item.product.id !== action.payload?.id),
      };
    case ActionType.UPDATE_QUANTITY:
      return {
        ...state,
        content: state.content.map((item: IItem) => (item.product.id === action.payload.product.id ? { ...item, quantity: action.payload.quantity } : item)),
      };
    case ActionType.CLEAR_CART:
      return {
        ...state,
        content: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
