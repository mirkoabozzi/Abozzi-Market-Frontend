import { Dispatch } from "@reduxjs/toolkit";
import { OrderAction } from "../action-types";
import { accessToken, url } from "./user";
import { ActionType } from "../enums/ActionType";

export const getMyOrders = () => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      const resp = await fetch(`${url}/orders/me`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const orders = await resp.json();
        dispatch({ type: ActionType.SET_ORDERS, payload: orders.content });
      } else {
        throw new Error("Get orders error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
