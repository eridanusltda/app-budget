import { combineReducers } from "redux";
import HistorySlice from "./HistoryReducers";
import NavSlice from "./NavReducers";

const rootReducer = combineReducers({
  historyReducers: HistorySlice.reducer,
  navReducers: NavSlice.reducer,
});

export default rootReducer;
