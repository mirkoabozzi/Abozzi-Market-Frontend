import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserReducer";
import productReducer from "../reducers/ProductsReducer";
import ordersReducer from "../reducers/OrdersReducer";
import reviewsReducer from "../reducers/ReviewsReducer";
import { useDispatch, useSelector, useStore } from "react-redux";
import wishlistsReducer from "../reducers/WishlistsReducer";
import categoriesReducer from "../reducers/CategoriesReducer";

const rootReducer = combineReducers({
  userReducer: userReducer as Reducer,
  productReducer: productReducer as Reducer,
  ordersReducer: ordersReducer as Reducer,
  reviewsReducer: reviewsReducer as Reducer,
  wishlistsReducer: wishlistsReducer as Reducer,
  categoriesReducer: categoriesReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
