import { CartAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  content: IProduct[];
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
        content: state.content.filter((produt: IProduct) => produt.id !== action.payload?.id),
      };

    default:
      return state;
  }
};

export default cartReducer;
