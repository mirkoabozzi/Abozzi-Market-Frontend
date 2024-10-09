import { Dispatch } from "@reduxjs/toolkit";
import { OrderAction } from "../action-types";
import { url } from "./user";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";

export const getMyOrders = (page: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders/me?page=${page}`, {
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

export const getOrder = (id: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const order = await resp.json();
        dispatch({ type: ActionType.SET_ORDER, payload: order });
      } else {
        throw new Error("Get order error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (order: IOrderAdd) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders`, {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (resp.ok) {
        dispatch(getMyOrders());
      } else {
        throw new Error("Add order error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllClientsOrders = (page: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders?page=${page}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const orders = await resp.json();
        dispatch({ type: ActionType.SET_ALL_CLIENTS_ORDERS, payload: orders.content });
      } else {
        throw new Error("Get orders error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
