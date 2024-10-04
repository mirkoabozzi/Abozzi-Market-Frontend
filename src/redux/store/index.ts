import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserReducer";
import productReducer from "../reducers/ProductsReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  productReducer: productReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
