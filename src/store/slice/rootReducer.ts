import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import productReducer from "./productSlice";

export const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productReducer,
});