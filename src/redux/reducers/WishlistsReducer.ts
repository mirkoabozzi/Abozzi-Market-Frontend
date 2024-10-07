import { WishlistAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
interface InitialState {
  wishlist: IWishlist[];
}

const initialState: InitialState = {
  wishlist: [],
};

const wishListsReducer = (state = initialState, action: WishlistAction) => {
  switch (action.type) {
    case ActionType.SET_WISHLISTS:
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};

export default wishListsReducer;
