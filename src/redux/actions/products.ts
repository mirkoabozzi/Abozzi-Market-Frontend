import { Dispatch } from "@reduxjs/toolkit";
import { ProductsAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { url } from "./user";
import { AppDispatch } from "../store";
import { errorToast, successToast } from "./toaster";
import axios from "axios";

export const getProducts = (page: number, size?: number) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    if (!size) size = 24;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/all?page=${page}&size=${size}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProduct = (id: string) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCT_LOADED_FALSE });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/product/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const product = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCT, payload: product });
        dispatch({ type: ActionType.SET_PRODUCT_LOADED_TRUE });
      } else {
        throw new Error("Get product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (product: IProductAdd) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (resp.ok) {
        dispatch(getProducts(0));
        successToast("Prodotto aggiunto.");
      } else {
        errorToast("Errore aggiunta prodotto.");
        throw new Error("Add product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProduct = (product: IProductUpdate, productId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (resp.ok) {
        successToast("Prodotto aggiornato.");
        dispatch(getProducts(0));
        dispatch(getProduct(productId));
      } else {
        errorToast("Errore aggiornamento prodotto.");
        throw new Error("Update product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const updateProductImage = (file: File, productId: string) => {
//   return async (dispatch: AppDispatch) => {
//     const formData = new FormData();
//     formData.append("image", file);
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const resp = await fetch(`${url}/products/image/${productId}`, {
//         method: "POST",
//         headers: { Authorization: "Bearer " + accessToken },
//         body: formData,
//       });
//       if (resp.ok) {
//         dispatch(getProducts(0));
//         dispatch(getProduct(productId));
//       } else {
//         errorToast("Caricamento immagine fallito.");
//         throw new Error("Update product image error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const addProductImageAxios = (file: File, productId: string, setUploadProgress: (progress: number) => void) => {
  return async (dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`${url}/products/image/${productId}`, formData, {
        headers: { Authorization: "Bearer " + accessToken },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadProgress(progress);
        },
      });
      setUploadProgress(100);
      successToast("Immagine aggiornata con successo.");
      dispatch(getProducts(0));
      dispatch(getProduct(productId));
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

export const deleteProduct = (productId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        successToast("Prodotto eliminato.");
        dispatch(getProducts(0));
      } else {
        errorToast("Errore cancellazione prodotto.");
        throw new Error("Delete product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByName = (productName: string, page: number, size?: number) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    if (!size) size = 24;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/name?name=${productName}&page=${page}&size=${size}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByPriceRange = (min: number, max: number, page: number, size?: number) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    if (!size) size = 24;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/price?min=${min}&max=${max}&page=${page}&size=${size}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByCategory = (categoryName: string, page: number, size?: number) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    if (!size) size = 24;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/category?name=${categoryName}&page=${page}&size=${size}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByDiscount = (page: number, size?: number) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    if (!size) size = 24;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/discount?page=${page}&size=${size}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const handleDiscountPrice = (product: IProduct) => {
  if (!product.discountStatus) {
    return product.price;
  }
  const today = new Date();
  const activeDiscount = product.discountList.find((discount) => {
    return new Date(discount.startDate) <= today && new Date(discount.endDate) >= today;
  });
  if (activeDiscount) {
    const discountPrice = product.price * (activeDiscount.percentage / 100);
    return parseFloat((product.price - discountPrice).toFixed(2));
  }
  return product.price;
};

export const dateConverter = (timeStamp: string) => {
  const data = new Date(timeStamp);
  return data.toLocaleString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const addDiscountOnProduct = (discount: string, product: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/add/discount/${product}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount }),
      });
      if (resp.ok) {
        successToast("Sconto aggiunto.");
        dispatch(getProduct(product));
      } else {
        throw new Error("Add product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteDiscountFromProduct = (productId: string, discount: IDiscountRemove) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/remove/discount/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discount),
      });
      if (resp.ok) {
        successToast("Sconto rimosso.");
        dispatch(getProduct(productId));
      } else {
        throw new Error("Delete discount error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
