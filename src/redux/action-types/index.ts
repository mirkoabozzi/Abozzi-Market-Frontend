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

export type WishlistAction = {
  type: ActionType;
  payload?: IReview;
};

export type CategoryAction = {
  type: ActionType;
  payload?: ICategory;
};

export type CartAction = {
  type: ActionType;
  payload?: IProduct;
};
