import { ReviewAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action: ReviewAction) => {
  switch (action.type) {
    case ActionType.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
