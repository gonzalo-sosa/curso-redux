// import { legacy_createStore as createStore } from "redux"; // createStore deprecated
// import { devToolsEnhancer } from "@redux-devtools/extension";
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer.js";
import auth from "./middleware/auth.js";
import toast from "./middleware/toast.js";
// import fn from "./middleware/fn.js"; <-- Redux Toolkit provee un forma simple de implementar middleware

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        auth.logger,
        auth.register("param"),
        toast,
      ]),
  });
}
