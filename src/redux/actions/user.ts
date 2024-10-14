import { Dispatch } from "@reduxjs/toolkit";
import { UserAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";
import { successToast } from "./toaster";

export const url = import.meta.env.VITE_URL;

export const getUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
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

export const updateUser = (body: IUserUpdate) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
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
  return async (dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users/me/avatar`, {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken },
        body: formData,
      });
      if (resp.ok) {
        dispatch(getUser());
      } else {
        throw new Error("Update user avatar error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const users = await resp.json();
        dispatch({ type: ActionType.SET_USERS, payload: users.content });
      } else {
        throw new Error("Get all user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserRole = (body: IUserRole) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users/role`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        console.log(resp.status);
        dispatch(getAllUser());
        successToast("Ruolo aggiornato");
      } else {
        throw new Error("Update user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        dispatch(getAllUser());
        successToast("Utente eliminato");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
