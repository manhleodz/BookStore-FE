import { createSlice } from "@reduxjs/toolkit";
import { Authentication } from "../Network/Authentication";

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        user: null,
        cart: [],
        filteredData: [],
        language: "VN",
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        signOut(state) {
            Authentication.signOut(() => {
                state.user = null;
                state.cart = [];
            });
        },
        setCart(state, action) {
            state.cart = [...action.payload];
        },
        addCart(state, action) {
            state.cart.push(action.payload);
        },
        deleteCart(state, action) {
            state.cart.splice(action.payload, 1);
        },
        setFilteredData(state, action) {
            state.filteredData = action.payload;
        },
        setLanguage(state, action) {
            state.language = action.payload;
        }
    },
});

export const { setUser, signOut, addCart, deleteCart, setFilteredData, setCart, setLanguage } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
