import { legacy_createStore as createStore } from "redux"; // createStore deprecated
import reducer from "./reducer.js";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
