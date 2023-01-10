import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

function store() {
  return configureStore({ reducer: rootReducer });
}

export default store;
