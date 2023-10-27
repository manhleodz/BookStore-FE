import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./AuthenticationSlice";

export const authenticationStore = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
});