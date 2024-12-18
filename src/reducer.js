import * as actions from "./actionTypes.js";

let lastId = 0;

/**
 * Reducer, actualiza el estado global de acuerdo a la acción indicada
 * @param {[]} state
 * @param {{ type: actions.BUG_ADDED | actions.BUG_REMOVED | actions.BUG_RESOLVED, payload: { } }} action
 */
function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      const bugResolved = { ...state[index], resolved: true };
      return [...state.slice(0, index), bugResolved, ...state.slice(index + 1)];

    default:
      return state;
  }
}

export default reducer;
