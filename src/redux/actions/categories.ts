import { Dispatch } from "@reduxjs/toolkit";
import { url } from "./user";
import { ActionType } from "../enums/ActionType";
import { CategoryAction } from "../action-types";
import { AppDispatch } from "../store";

export const getCategories = () => {
  return async (dispatch: Dispatch<CategoryAction>) => {
    try {
      const resp = await fetch(`${url}/categories/all`);
      if (resp.ok) {
        const categories = await resp.json();
        dispatch({ type: ActionType.SET_CATEGORIES, payload: categories.content });
      } else {
        throw new Error("Get category error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addCategory = (newCategory: IAddCategory) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/categories`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (resp.ok) {
        dispatch(getCategories());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addImageCategory = (file: File, categoryId: string) => {
  return async (dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/categories/image/${categoryId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        body: formData,
      });
      if (resp.ok) {
        dispatch(getCategories());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCategory = (categoryId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/categories/${categoryId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (resp.ok) {
        dispatch(getCategories());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
