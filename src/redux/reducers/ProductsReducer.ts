import { ProductsAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  products: IProduct[];
  isLoading: boolean;
  product: IProduct | null;
}

const initialState: InitialState = {
  products: [],
  isLoading: false,
  product: null,
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
    case ActionType.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
