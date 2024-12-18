/**
 * Crea un almacén donde se guardan los estados
 * @param {Function} reducer
 * @returns { { dispatch: Function, suscribe: Function, getState: Function, replaceReducer: Function} }
 */

function createStore(reducer) {
  let state;
  let listeners = [];

  function dispatch(action) {
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function suscribe(listener) {
    listeners.push(listener);
  }

  function getState() {
    return state;
  }

  function replaceReducer(nextReducer) {}

  return {
    dispatch,
    suscribe,
    getState,
    replaceReducer,
  };
}

export default createStore;
