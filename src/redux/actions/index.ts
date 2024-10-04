import { Dispatch } from "@reduxjs/toolkit";
import { ProductsAction, UserAction } from "../action-types/intex";
import { ActionType } from "../enums/ActionType";

export const url = import.meta.env.VITE_URL;
export const accessToken = localStorage.getItem("accessToken");

export const getUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const resp = await fetch(`${url}/users/me`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const user = await resp.json();
        dispatch({ type: ActionType.SET_USER, payload: user });
      } else {
        throw new Error("Get user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    try {
      const resp = await fetch(`${url}/products`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products.content });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
