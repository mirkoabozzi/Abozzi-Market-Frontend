import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
