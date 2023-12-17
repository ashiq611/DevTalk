import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import blogReducer from "../slices/blogSlice";

export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    blog: blogReducer,
  },
});
