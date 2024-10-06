import { OrderAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action: OrderAction) => {
  switch (action.type) {
    case ActionType.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
  }
  return state;
};

export default ordersReducer;
