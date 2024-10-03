import { UserAction } from "../action-types/intex";
import { ActionType } from "../enums/ActionType";

const intialState = {
  user: null,
};

const userReducer = (state = intialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
