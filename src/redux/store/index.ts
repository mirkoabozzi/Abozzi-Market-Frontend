import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserReducer";
import productReducer from "../reducers/ProductsReducer";
import ordersReducer from "../reducers/OrdersReducer";
import reviewsReducer from "../reducers/ReviewsReducer";
import { useDispatch, useSelector, useStore } from "react-redux";
import wishlistsReducer from "../reducers/WishlistsReducer";
import categoriesReducer from "../reducers/CategoriesReducer";
import cartReducer from "../reducers/CartReducer";
import addressesSlice from "../slice/addressesSlice";
import discountsSlice from "../slice/discountsSlice";
import weatherSlice from "../slice/weatherSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_KEY,
    }),
  ],
};

const rootReducer = combineReducers({
  userReducer: userReducer as Reducer,
  productReducer: productReducer as Reducer,
  ordersReducer: ordersReducer as Reducer,
  reviewsReducer: reviewsReducer as Reducer,
  wishlistsReducer: wishlistsReducer as Reducer,
  categoriesReducer: categoriesReducer as Reducer,
  cartReducer: cartReducer as Reducer,
  addresses: addressesSlice as Reducer,
  discounts: discountsSlice as Reducer,
  weather: weatherSlice as Reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }) });
export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
export const persistor = persistStore(store);
