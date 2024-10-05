import { UserAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

const intialState = {
  user: null,
  isLogged: false,
};

const userReducer = (state = intialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.SET_IS_LOGGED_TRUE:
      return {
        ...state,
        isLogged: action.payload,
      };
    case ActionType.SET_IS_LOGGED_FALSE:
      return {
        ...state,
        isLogged: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
