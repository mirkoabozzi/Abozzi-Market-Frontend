import { Dispatch } from "@reduxjs/toolkit";
import { ReviewAction } from "../action-types";
import { accessToken, url } from "./user";
import { ActionType } from "../enums/ActionType";

export const getReview = (id: string) => {
  return async (dispatch: Dispatch<ReviewAction>) => {
    try {
      const resp = await fetch(`${url}/reviews/product/${id}`, {
        headers: {
          Authorization: "bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const review = await resp.json();
        console.log(review);

        dispatch({ type: ActionType.SET_REVIEWS, payload: review.content });
      } else {
        throw new Error("Get reviews error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
