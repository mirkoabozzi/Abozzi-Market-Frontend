import { ActionType } from "../enums/ActionType";

export type UserAction = {
  type: ActionType;
  payload?: IUser;
};

export type ProductsAction = {
  type: ActionType;
  payload?: IProduct;
};
