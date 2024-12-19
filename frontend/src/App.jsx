import './App.css'
import configureStore from './store/configureStore.js';
import { addBug, assignBugToUser, getBugsByUser, getUnresolvedBugs, resolveBug } from "./store/bugs.js"
import { loadBugs } from './store/bugs.js';

function App() {
  const store = configureStore()
  
  store.dispatch(loadBugs())
  
  setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000)

  return (
    <>
      <h1>Redux</h1>

      <h2>Bugs</h2>
      <ul>{
        store.getState().entities.bugs.list.map(bug => <li key={bug.id}>{JSON.stringify(bug)}</li>)
      }</ul>
    </>
  )
}

export default App
