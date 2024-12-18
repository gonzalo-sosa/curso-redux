import './App.css'
import { actions } from "./store/bugs.js"
import configureStore from './store/configureStore.js';

function App() {
  const store = configureStore()

  store.dispatch(actions.bugAdded({ description: "Bug1" }));
  store.dispatch(actions.bugAdded({ description: "Bug2" }));
  store.dispatch(actions.bugAdded({ description: "Bug3" }));
  store.dispatch(actions.bugResolved({ id: 1 }));

  return (
    <>
      <h1>Hello World! {JSON.stringify(store.getState())}</h1>
    </>
  )
}

export default App
