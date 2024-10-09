import { url } from "./user";

export const pay = (sum: number) => {
  return async () => {
    const payment: IPayment = {
      sum,
      currency: "EUR",
      method: "paypal",
      intent: "sale",
      description: "description",
      cancelUrl: "http://localhost:5173/cancel",
      successUrl: "http://localhost:5173/success",
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
        const redirectUrl = responseText.substring(9);
        window.location.href = redirectUrl;
      } else {
        throw new Error("Add product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const execute = (paymentId: string, payerId: string) => {
  return async () => {
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
        const responseText = await resp.text();
        const redirectUrl = responseText.substring(9);
        window.location.href = redirectUrl;
      } else {
        throw new Error("Add product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
