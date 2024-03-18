import { configureStore } from "@reduxjs/toolkit";
import mosqueSlice from "./mosques/mosqueSlice";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      }),
    reducer:{
        mosque:mosqueSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;