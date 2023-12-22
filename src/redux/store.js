import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import authReducer from "./slice/authSlice";
import leadSearchReducer from "./slice/leadSearchSlice";
import clientSearchReducer from "./slice/clientSearchSlice";
import orderSearchReducer from "./slice/orderSearchSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    leadSearch: leadSearchReducer,
    clientSearch: clientSearchReducer,
    orderSearch: orderSearchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
