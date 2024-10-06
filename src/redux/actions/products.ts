import { Dispatch } from "@reduxjs/toolkit";
import { ProductsAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { accessToken, url } from "./user";

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

export const getProduct = (id: string) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    try {
      const resp = await fetch(`${url}/products/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const product = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCT, payload: product });
      } else {
        throw new Error("Get product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
