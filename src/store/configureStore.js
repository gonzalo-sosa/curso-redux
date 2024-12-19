// import { legacy_createStore as createStore } from "redux"; // createStore deprecated
// import { devToolsEnhancer } from "@redux-devtools/extension";
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer.js";
import logger from "./middleware/logger.js";

export default function () {
  return configureStore({
    reducer,
    middleware: [logger],
  });
}
