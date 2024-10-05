import { Dispatch } from "@reduxjs/toolkit";
import { ProductsAction, UserAction } from "../action-types";
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

export const updateUser = (body: IUserUpdate) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const resp = await fetch(`${url}/users/me`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        console.log(resp.status);
        dispatch(getUser());
      } else {
        throw new Error("Update user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserAvatar = (file: File) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const resp = await fetch(`${url}/users/me/avatar`, {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken },
        body: formData,
      });
      if (resp.ok) {
        console.log(resp.status);
        dispatch(getUser());
      } else {
        throw new Error("Update user avatar error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
