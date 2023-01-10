import { createSlice } from "@reduxjs/toolkit";
const initialState = { currentPage: "/" };

const NavSlice = createSlice({
  name: "NavSlice",
  initialState,
  reducers: {
    CHANGE_PAGE: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export default NavSlice;
