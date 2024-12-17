import { legacy_createStore as createStore } from "redux"; // createStore deprecated
import reducer from "./reducer.js";

const store = createStore(reducer);

export default store;
