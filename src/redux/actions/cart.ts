import { url } from "./user";
import { AppDispatch } from "../store";
import { clearAddressChoice } from "../slice/addressesSlice";
import { ActionType } from "../enums/ActionType";
import { setPaymentLoading } from "../slice/paymentSlice";
const appUrl = import.meta.env.VITE_MY_APP_URL;

export const pay = (sum: number) => {
  return async (dispatch: AppDispatch) => {
    const payment: IPayment = {
      sum,
      currency: "EUR",
      method: "paypal",
      intent: "sale",
      description: "description",
      cancelUrl: `${appUrl}/cancel`,
      successUrl: `${appUrl}/success`,
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/pay`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });
      if (resp.ok) {
        const responseText = await resp.text();
        dispatch(setPaymentLoading(false));
        const redirectUrl = responseText.substring(9);
        window.location.href = redirectUrl;
      } else {
        throw new Error("Payment error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPaymentLoading(false));
    }
  };
};

export const execute = (paymentId: string, payerId: string) => {
  return async (dispatch: AppDispatch) => {
    const execute: IExecute = {
      paymentId,
      payerId,
      approvedUrl: "profile",
      failedUrl: "failed",
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/pay/execute`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(execute),
      });
      if (resp.ok) {
        dispatch(clearAddressChoice());
        dispatch({ type: ActionType.CLEAR_CART });
        dispatch(setPaymentLoading(false));
        const responseText = await resp.text();
        const redirectUrl = responseText.substring(9);
        window.location.href = redirectUrl;
      } else {
        throw new Error("Execute payment error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPaymentLoading(false));
    }
  };
};
