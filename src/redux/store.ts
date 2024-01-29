import { configureStore } from "@reduxjs/toolkit";
import mosqueSlice from "./mosques/mosqueSlice";

const store = configureStore({
    reducer:{
        mosque:mosqueSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;