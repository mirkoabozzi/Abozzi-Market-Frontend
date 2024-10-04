import { ProductsAction } from "../action-types/intex";
import { ActionType } from "../enums/ActionType";

const initialState = {
  products: [],
  isLoading: false,
};

const productReducer = (state = initialState, action: ProductsAction) => {
  switch (action.type) {
    case ActionType.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ActionType.SET_PRODUCTS_LOADING_ON:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.SET_PRODUCTS_LOADING_OFF:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
