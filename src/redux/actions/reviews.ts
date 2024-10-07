import { url } from "./user";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";

export const getReview = (id: string) => {
  return async (dispatch: AppDispatch) => {
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
        dispatch(getReview(review.product));
      } else {
        throw new Error("Add review error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
