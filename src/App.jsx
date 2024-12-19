import './App.css'
import configureStore from './store/configureStore.js';
import { bugAdded, bugAssignedToUser, bugResolved, getBugsByUser, getUnresolvedBugs } from "./store/bugs.js"
import { projectAdded } from './store/projects.js';
import { userAdded } from './store/users.js';

function App() {
  const store = configureStore()

  // store.dispatch(bugAdded({ description: "Bug 1"}))
  // store.dispatch(bugAdded({ description: "Bug 2"}))
  // store.dispatch(bugResolved({ id: 1 }))
  
  store.dispatch((dispatch, getState) => {
    dispatch({ type: "bugsReceived", bugs: [1, 2, 3] })
    console.log({ state: getState() })
  })
  
  store.dispatch({
    type: "error",
    payload: { message: "An error occurred"}
  })

  // store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }))
  // store.dispatch(projectAdded({ name: "Project 1" }))
  // store.dispatch(userAdded({ name: "Agustín"}))
  // store.dispatch(userAdded({ name: "Gonzalo" }))

  console.log(
    getBugsByUser(1)(store.getState())
  )

  return (
    <>
      <h1>Redux</h1>

      <h2>Bugs</h2>
      <ul>{
        store.getState().entities.bugs.map(bug => <li key={bug.id}>{JSON.stringify(bug)}</li>)
      }</ul>
      {/* <h3>Unresolved Bugs</h3>
      <ul>{
        getUnresolvedBugs(store.getState()).map(bug => <li key={bug.id}>{JSON.stringify(bug)}</li>)
      }</ul>
      <h2>Projects</h2>
      <ul>{
        store.getState().entities.projects.map(project => <li key={project.id}>{JSON.stringify(project)}</li>)
      }</ul>
      <h2>Users</h2>
      <ul>{
        store.getState().entities.users.map(user => <li key={user.id}>{JSON.stringify(user)}</li>)
      }</ul> */}
    </>
  )
}

export default App
