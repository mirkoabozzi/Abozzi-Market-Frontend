import { Dispatch } from "@reduxjs/toolkit";
import { UserAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";
import { errorToast, successToast } from "./toaster";

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
        successToast("Dati aggiornati con successo!");
        dispatch(getUser());
      } else {
        errorToast("Aggiornamento fallito!");
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

export const getAllUser = (page: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users?page=${page}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const users = await resp.json();
        dispatch({ type: ActionType.SET_USERS, payload: users });
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
        dispatch(getAllUser(0));
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
        dispatch(getAllUser(0));
        successToast("Utente eliminato");
      } else {
        errorToast("Impossibile eliminare questo utente");
        throw new Error("Delete user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const findUserByName = (name: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users/name?user=${name}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const users = await resp.json();
        dispatch({ type: ActionType.SET_USERS, payload: users });
      } else {
        throw new Error("Find user by name error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetUserPasswordRequest = (email: string) => {
  return async () => {
    try {
      const resp = await fetch(`${url}/authentication/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (resp.ok) {
        successToast("Email di recupero inviata");
      } else {
        errorToast("Email non trovata");
        throw new Error("Find user by email error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetUserPassword = (token: string, password: string) => {
  return async () => {
    try {
      const resp = await fetch(`${url}/authentication/reset/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (resp.ok) {
        successToast("Password cambiata con successo");
      } else {
        errorToast("Token scaduto invia una nuova richiesta");
        throw new Error("Reset user password error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserPassword = (newPasswordObj: IUserPasswordUpdate) => {
  return async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users/me/password`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPasswordObj),
      });
      if (resp.ok) {
        successToast("Password cambiata con successo");
      } else {
        errorToast("Errore cambio password");
        throw new Error("Update user password error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
