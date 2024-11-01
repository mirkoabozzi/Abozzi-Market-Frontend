import { Dispatch } from "@reduxjs/toolkit";
import { OrderAction } from "../action-types";
import { url } from "./user";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";
import { errorToast, successToast } from "./toaster";
import { NavigateFunction } from "react-router-dom";

export const getMyOrders = (page: number, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders/me?page=${page}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const orders = await resp.json();
        dispatch({ type: ActionType.SET_ORDERS, payload: orders });
      } else {
        if (resp.status === 401) {
          errorToast("Token scaduto effettua il login");
          dispatch({ type: ActionType.SET_IS_LOGGED_FALSE });
          dispatch({ type: ActionType.SET_USER, payload: null });
          navigate("/");
        }
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

export const addOrder = (order: IOrderAdd, navigate: NavigateFunction) => {
  return async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders`, {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (resp.ok) {
        successToast("Ordine creato");
        navigate("/profile");
      } else {
        errorToast("Qualcosa è andato storto!");
        navigate("/failed");
        throw new Error("Add order error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllClientsOrders = (page: number, navigate: NavigateFunction) => {
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
        dispatch({ type: ActionType.SET_ALL_CLIENTS_ORDERS, payload: orders });
      } else {
        if (resp.status === 401 || resp.status === 403) {
          navigate("/");
        }
        throw new Error("Get orders error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrderState = (order: IOrderUpdateStatus) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (resp.ok) {
        dispatch(getOrder(order.order));
        successToast("Stato ordine aggiornato");
      } else {
        throw new Error("Update order status error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrdersByUserEmail = (page: number, email: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders/user?page=${page}&email=${email}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const orders = await resp.json();
        dispatch({ type: ActionType.SET_ALL_CLIENTS_ORDERS, payload: orders });
      } else {
        throw new Error("Get orders error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMyOrder = (id: string, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/orders/me/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const order = await resp.json();
        dispatch({ type: ActionType.SET_ORDER, payload: order });
      } else {
        if (resp.status === 401) {
          dispatch({ type: ActionType.SET_IS_LOGGED_FALSE });
          dispatch({ type: ActionType.SET_USER, payload: null });
          navigate("/");
        }
        throw new Error("Get my order error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderStatusConverter = (ordersState: string) => {
  switch (ordersState) {
    case "PROCESSING":
      return "In lavorazione";
    case "CANCELLED":
      return "Cancellato";
    case "SHIPPED":
      return "Spedito";
    case "IN_TRANSIT":
      return "In transito";
    case "ON_DELIVERY":
      return "In consegna";
    case "DELIVERED":
      return "Consegnato";
    case "READY_TO_PICKUP":
      return "Pronto per il ritiro";
    default:
      break;
  }
};
