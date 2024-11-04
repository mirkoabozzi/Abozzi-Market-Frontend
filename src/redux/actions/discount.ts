import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { url } from "./user";
import { setDiscounts } from "../slice/discountsSlice";
import { errorToast, successToast } from "./toaster";

export const getAllDiscounts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/discounts`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const discounts = await resp.json();
        dispatch(setDiscounts(discounts.content));
      } else {
        throw new Error("Get discounts error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addDiscount = (discount: IDiscountAdd) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/discounts`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discount),
      });
      if (resp.ok) {
        dispatch(getAllDiscounts());
        successToast("Promozione aggiunta.");
      } else {
        errorToast("Errore aggiunta promo.");
        throw new Error("Add discount error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePromo = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/discounts/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        dispatch(getAllDiscounts());
        successToast("Promozione eliminata.");
      } else {
        throw new Error("Delete discount error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateDiscount = (discount: DiscountListItem) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/discounts/${discount.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discount),
      });
      if (resp.ok) {
        dispatch(getAllDiscounts());
        successToast("Promozione aggiornata");
      } else {
        errorToast("Errore aggiornamento promozione.");
        throw new Error("Update discount error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
