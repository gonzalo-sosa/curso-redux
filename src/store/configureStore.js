// import { legacy_createStore as createStore } from "redux"; // createStore deprecated
// import { devToolsEnhancer } from "@redux-devtools/extension";
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

import reducer from "./bugs.js";

import { configureStore } from "@reduxjs/toolkit";

export default function () {
  return configureStore({
    reducer,
  });
}
