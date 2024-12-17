import store from "./store.js";
import { bugAdded, bugRemoved, bugResolved } from "./actions.js";

// suscribirse a la store significa que cada vez que se modifique el estado se llamara a la función

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch(bugAdded("Bug1"));

console.log("Adding state to store: ", store.getState());

// unsubscribe(); // <-- deja de notificar

// store.dispatch(bugRemoved(1));
// console.log("Deleting the state in the store: ", store.getState());

store.dispatch(bugResolved(1));
