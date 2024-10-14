import { url } from "./user";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";
import { Dispatch } from "@reduxjs/toolkit";
import { ReviewAction } from "../action-types";
import { errorToast, successToast } from "./toaster";

export const getReview = (id: string) => {
  return async (dispatch: Dispatch<ReviewAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/reviews/product/${id}`, {
        headers: {
          Authorization: "bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const review = await resp.json();
        dispatch({ type: ActionType.SET_REVIEWS, payload: review.content });
      } else {
        throw new Error("Get reviews error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addReview = (review: IReviewAdd) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/reviews`, {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      if (resp.ok) {
        successToast("Recensione aggiunta");
        dispatch(getReview(review.product));
      } else {
        if (resp.status === 400) {
          errorToast("Hai già recensito il prodotto");
          throw new Error("Add review error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateReview = (reviewId: string, updatedReview: IUpdatedReview, productId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/reviews/me/${reviewId}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(updatedReview),
      });
      if (resp.ok) {
        successToast("Recensione aggiornata");
        dispatch(getReview(productId));
      } else {
        if (resp.status === 401) {
          errorToast("Puoi modificare solo le tue recensioni!");
          throw new Error("Update review error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
