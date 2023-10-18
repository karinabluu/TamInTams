import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../redux/slice/loginSlice";
import joinSlice from "./slice/joinSlice";

export const store = configureStore({
  reducer: { login: loginSlice, join: joinSlice },
});
