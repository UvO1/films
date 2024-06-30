import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, authorizedSlice } from "../entities/slices";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authorized: authorizedSlice.reducer
        //slice: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});