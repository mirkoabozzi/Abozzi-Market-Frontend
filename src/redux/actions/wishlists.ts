import { Dispatch } from "@reduxjs/toolkit";
import { WishlistAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { accessToken, url } from "./user";
import { AppDispatch } from "../store";

export const getMyWishlists = () => {
  return async (dispatch: Dispatch<WishlistAction>) => {
    try {
      const resp = await fetch(`${url}/wishlists/me`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const wishlists = await resp.json();
        dispatch({ type: ActionType.SET_WISHLISTS, payload: wishlists.content });
      } else {
        throw new Error("Get wishlists error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToWishlist = (product: IWishlistAdd) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await fetch(`${url}/wishlists`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (resp.ok) {
        dispatch(getMyWishlists());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromWishlist = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await fetch(`${url}/wishlists/me/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        dispatch(getMyWishlists());
      }
    } catch (error) {
      console.log(error);
    }
  };
};