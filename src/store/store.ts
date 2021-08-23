import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./team";

export const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});

// this is all unused lol
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
