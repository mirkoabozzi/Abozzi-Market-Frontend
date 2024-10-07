import { ActionType } from "../enums/ActionType";

export type UserAction = {
  type: ActionType;
  payload?: IUser;
};

export type ProductsAction = {
  type: ActionType;
  payload?: IProduct;
};

export type OrderAction = {
  type: ActionType;
  payload?: IOrder;
};

export type ReviewAction = {
  type: ActionType;
  payload?: IReview;
};
