import { CategoryAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  categories: ICategory[];
}

const initialState: InitialState = {
  categories: [],
};

const categoriesReducer = (state = initialState, action: CategoryAction) => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
