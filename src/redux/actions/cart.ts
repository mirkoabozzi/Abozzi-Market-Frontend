import { url } from "./user";
import { AppDispatch } from "../store";
import { clearAddressChoice } from "../slice/addressesSlice";
import { ActionType } from "../enums/ActionType";
import { setPaymentLoading } from "../slice/paymentSlice";
import { errorToast, successToast } from "./toaster";
import { NavigateFunction } from "react-router-dom";
const appUrl = import.meta.env.VITE_MY_APP_URL;

export const payPalPay = (sum: number, setLoadingPayPal: (b: boolean) => void) => {
  return async () => {
    const payment: IPayment = {
      sum,
      currency: "EUR",
      method: "paypal",
      intent: "sale",
      description: "PayPal",
      cancelUrl: `${appUrl}/cancel`,
      successUrl: `${appUrl}/success`,
    };
    try {
      setLoadingPayPal(true);
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
        const redirectUrl = responseText.substring(9);
        window.location.href = redirectUrl;
      } else {
        throw new Error("Payment error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPayPal(false);
    }
  };
};

export const executePayPal = (paymentId: string, payerId: string, navigate: NavigateFunction) => {
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
        successToast("Grazie per il tuo acquisto.");
        dispatch(clearAddressChoice());
        dispatch({ type: ActionType.CLEAR_CART });
        dispatch(setPaymentLoading(false));
        // const responseText = await resp.text();
        // const redirectUrl = responseText.substring(9);
        // window.location.href = redirectUrl;
      } else {
        errorToast("Pagamento fallito.");
        navigate("/failed");
        throw new Error("Execute payment error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPaymentLoading(false));
    }
  };
};

export const stripePay = (sum: number, setLoadingStripe: (b: boolean) => void) => {
  return async () => {
    const payment: IStripePayment = {
      sum,
      approvedUrl: `${appUrl}/success`,
      failedUrl: `${appUrl}/cancel`,
    };
    try {
      setLoadingStripe(true);
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/stripe`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });
      if (resp.ok) {
        const responseText = await resp.text();
        window.location.href = responseText;
      } else {
        throw new Error("Payment error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStripe(false);
    }
  };
};

export const stripeVerify = (sessionId: string, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/stripe/verify?sessionId=${sessionId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        successToast("Grazie per il tuo acquisto.");
        dispatch(clearAddressChoice());
        dispatch({ type: ActionType.CLEAR_CART });
        dispatch(setPaymentLoading(false));
      } else {
        errorToast("Pagamento fallito.");
        navigate("/failed");
        throw new Error("Execute payment error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPaymentLoading(false));
    }
  };
};
