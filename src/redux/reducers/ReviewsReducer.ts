import { ReviewAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  reviews: IReview[];
}

const initialState: InitialState = {
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
