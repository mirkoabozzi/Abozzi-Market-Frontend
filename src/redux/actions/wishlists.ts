import { Dispatch } from "@reduxjs/toolkit";
import { WishlistAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { url } from "./user";
import { AppDispatch } from "../store";
import { successToast } from "./toaster";

export const getMyWishlists = () => {
  return async (dispatch: Dispatch<WishlistAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
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
      const accessToken = localStorage.getItem("accessToken");
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
        successToast("Articolo aggiunto ai preferiti.");
      } else {
        throw new Error("Add to wishlist error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromWishlist = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/wishlists/me/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        dispatch(getMyWishlists());
        successToast("Articolo rimosso dai preferiti.");
      } else {
        throw new Error("Remove from wishlist error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
