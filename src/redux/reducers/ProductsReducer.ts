import { ProductsAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  products: IProductsInterface | null;
  isLoading: boolean;
  product: IProduct | null;
  productLoaded: boolean;
}

const initialState: InitialState = {
  products: null,
  isLoading: false,
  product: null,
  productLoaded: false,
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
    case ActionType.SET_PRODUCT_LOADED_TRUE:
      return {
        ...state,
        productLoaded: true,
      };
    case ActionType.SET_PRODUCT_LOADED_FALSE:
      return {
        ...state,
        productLoaded: false,
      };
    default:
      return state;
  }
};

export default productReducer;
