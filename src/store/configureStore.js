import { legacy_createStore as createStore } from "redux"; // createStore deprecated
import { devToolsEnhancer } from "@redux-devtools/extension";
import reducer from "./bugs.js";

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore() {
  const store = createStore(reducer, devToolsEnhancer({ trace: true }));
  return store;
}
