import { Dispatch } from "@reduxjs/toolkit";
import { ProductsAction } from "../action-types";
import { ActionType } from "../enums/ActionType";
import { url } from "./user";
import { AppDispatch } from "../store";

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/all`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products.content });
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
        dispatch(getProducts());
      } else {
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
        dispatch(getProducts());
        dispatch(getProduct(productId));
      } else {
        throw new Error("Update product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProductImage = (file: File, productId: string) => {
  return async (dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/image/${productId}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken },
        body: formData,
      });
      if (resp.ok) {
        dispatch(getProducts());
        dispatch(getProduct(productId));
      } else {
        throw new Error("Update product image error");
      }
    } catch (error) {
      console.log(error);
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
        dispatch(getProducts());
      } else {
        throw new Error("Delete product error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByName = (productName: string) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/name?name=${productName}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products.content });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByPriceRange = (min: number, max: number) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/price?min=${min}&max=${max}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products.content });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByCategory = (categoryName: string) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/category?name=${categoryName}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products.content });
        dispatch({ type: ActionType.SET_PRODUCTS_LOADING_OFF });
      } else {
        throw new Error("Get products error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByDiscount = () => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({ type: ActionType.SET_PRODUCTS_LOADING_ON });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/products/discount`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const products = await resp.json();
        dispatch({ type: ActionType.SET_PRODUCTS, payload: products.content });
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
  if (product.discountList.length === 0) {
    return product.price;
  }
  const today = new Date();
  const activeDiscount = product.discountList.find((discount) => {
    return new Date(discount.startDate) <= today && new Date(discount.endDate) >= today;
  });
  if (activeDiscount) {
    const discountPrice = product.price * (activeDiscount.percentage / 100);
    return product.price - discountPrice;
  }
  return product.price;
};

export const dataConverter = (timeStamp: string) => {
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
        dispatch(getProduct(productId));
      } else {
        throw new Error("Delete discount error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
