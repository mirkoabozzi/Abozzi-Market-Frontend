import { Dispatch } from "@reduxjs/toolkit";
import { UserAction } from "../action-types/intex";
import { ActionType } from "../enums/ActionType";

export const getUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const resp = await fetch("http://localhost:3001/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
