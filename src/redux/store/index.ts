import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserReducer";
import productReducer from "../reducers/ProductsReducer";
import ordersReducer from "../reducers/OrdersReducer";
import reviewsReducer from "../reducers/ReviewsReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  productReducer: productReducer,
  ordersReducer: ordersReducer,
  reviewsReducer: reviewsReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
