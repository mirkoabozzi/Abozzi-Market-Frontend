import { CartAction } from "../action-types";
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
        content: state.content.filter((item: IItem) => item.product.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default cartReducer;
