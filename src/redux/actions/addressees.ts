import { Dispatch } from "@reduxjs/toolkit";
import { setAddresses } from "../slice/addressesSlice";
import { url } from "./user";
import { AppDispatch } from "../store";
import { errorToast, successToast } from "./toaster";

export const getAllAddress = () => {
  return async (dispatch: Dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/shipments/me`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const addresses = await resp.json();
        dispatch(setAddresses(addresses.content));
      } else {
        throw new Error("Get addresses error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (newAddress: IAddressAdd) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/shipments`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });
      if (resp.ok) {
        dispatch(getAllAddress());
        successToast("Indirizzo aggiunto.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteAddress = (addressId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/shipments/me/${addressId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        dispatch(getAllAddress());
        successToast("Indirizzo eliminato.");
      } else {
        errorToast("Indirizzo in uso!");
        throw new Error("Delete address error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
