import './App.css'
import configureStore from './store/configureStore.js';
import { addBug, assignBugToUser, getBugsByUser, getUnresolvedBugs, resolveBug } from "./store/bugs.js"
import { loadBugs } from './store/bugs.js';
import { StoreContext } from './context/storeContext';

const store = configureStore()

function App() {  
  store.dispatch(loadBugs())
  setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000)

  return (
    <>
      <h1>Redux</h1>

      <h2>Bugs</h2>

      <StoreContext.Provider value={store}>
        <Bugs />
      </StoreContext.Provider>
    </>
  )
}

export default App
