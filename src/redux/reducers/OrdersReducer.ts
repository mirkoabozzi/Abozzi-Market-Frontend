import { OrderAction } from "../action-types";
import { ActionType } from "../enums/ActionType";

interface InitialState {
  orders: IOrdersInterface | null;
  order: IOrder | null;
  clientsOrder: IOrdersInterface | null;
}
const initialState: InitialState = {
  orders: null,
  order: null,
  clientsOrder: null,
};

const ordersReducer = (state = initialState, action: OrderAction) => {
  switch (action.type) {
    case ActionType.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ActionType.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case ActionType.SET_ALL_CLIENTS_ORDERS:
      return {
        ...state,
        clientsOrder: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
