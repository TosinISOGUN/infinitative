import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slice/rootReducer";

export const store = configureStore({
    reducer: rootReducer
})