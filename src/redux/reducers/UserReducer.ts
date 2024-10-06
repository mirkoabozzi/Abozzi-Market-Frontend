import { UserAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

const initialState = {
  user: null,
  isLogged: false,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.SET_IS_LOGGED_TRUE:
      return {
        ...state,
        isLogged: true,
      };
    case ActionType.SET_IS_LOGGED_FALSE:
      return {
        ...state,
        isLogged: false,
      };

    default:
      return state;
  }
};

export default userReducer;
