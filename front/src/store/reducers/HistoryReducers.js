import { createSlice } from "@reduxjs/toolkit";
const initialState = { openMonth: false };

const HistorySlice = createSlice({
  name: "HistorySlice",
  initialState,
  reducers: {
    OPEN_MONTH: (state, action) => {
      state.openMonth = action.payload;
    },
  },
});

export default HistorySlice;
