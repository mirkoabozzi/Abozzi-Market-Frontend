import { Dispatch } from "@reduxjs/toolkit";
import { UserAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { AppDispatch } from "../store";
import { errorToast, successToast } from "./toaster";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";

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
        successToast("Dati aggiornati con successo.");
        dispatch(getUser());
      } else {
        errorToast("Aggiornamento fallito.");
        throw new Error("Update user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const updateUserAvatar = (file: File) => {
//   return async (dispatch: AppDispatch) => {
//     const formData = new FormData();
//     formData.append("avatar", file);
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const resp = await fetch(`${url}/users/me/avatar`, {
//         method: "POST",
//         headers: { Authorization: "Bearer " + accessToken },
//         body: formData,
//       });
//       if (resp.ok) {
//         dispatch(getUser());
//       } else {
//         throw new Error("Update user avatar error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const updateUserAvatarAxios = (file: File, setUploadProgress: (progress: number) => void) => {
  return async () => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`${url}/users/me/avatar`, formData, {
        headers: { Authorization: "Bearer " + accessToken },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadProgress(progress);
        },
      });
      setUploadProgress(100);
      successToast("Avatar aggiornato con successo.");
    } catch (error) {
      console.error(error);
      setUploadProgress(0);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Maximum upload size exceeded") errorToast("Immagine troppo grande.");
        else errorToast("Errore caricamento immagine.");
      }
    } finally {
      setUploadProgress(0);
    }
  };
};

export const getAllUser = (page: number, navigate?: NavigateFunction) => {
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
        if ((resp.status === 401 || resp.status === 403) && navigate) {
          navigate("/");
        }
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
        successToast("Ruolo aggiornato.");
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
        successToast("Utente eliminato.");
      } else {
        errorToast("Impossibile eliminare questo utente.");
        throw new Error("Delete user error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const findUserByName = (name: string, page: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/users/name?user=${name}&page=${page}`, {
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

export const resetUserPasswordRequest = (email: string, handleClose: () => void, setIsLoading: (b: boolean) => void) => {
  return async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${url}/authentication/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (resp.ok) {
        successToast("Email di recupero inviata.");
        handleClose();
      } else {
        errorToast("Email non trovata.");
        throw new Error("Find user by email error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
};

export const resetUserPassword = (token: string, password: string, setIsLoading: (b: boolean) => void, navigate: NavigateFunction) => {
  return async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${url}/authentication/reset/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (resp.ok) {
        successToast("Password cambiata con successo.");
      } else {
        errorToast("Token scaduto invia una nuova richiesta.");
        throw new Error("Reset user password error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/");
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
        successToast("Password cambiata con successo.");
      } else {
        errorToast("Errore cambio password.");
        throw new Error("Update user password error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
