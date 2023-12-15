import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "admin",
  initialState: {
    // user exist or not
    userInfo: localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null,
  },
  reducers: {
    userLoginInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
