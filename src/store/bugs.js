import { createAction } from "@reduxjs/toolkit";

// Actions Types
const ACTIONS_TYPES = {
  BUG_ADDED: "bugAdded",
  BUG_REMOVED: "bugRemoved",
  BUG_RESOLVED: "bugResolved",
};

// Actions Creators
const bugAdded = createAction(ACTIONS_TYPES.BUG_ADDED);
const bugRemoved = createAction(ACTIONS_TYPES.BUG_REMOVED);
const bugResolved = createAction(ACTIONS_TYPES.BUG_RESOLVED);

export const actions = {
  bugAdded,
  bugRemoved,
  bugResolved,
};

let lastId = 0;

/**
 * Reducer, actualiza el estado global de acuerdo a la acción indicada
 * @param {[]} state
 * @param {{ type: ACTIONS_TYPES.BUG_ADDED | ACTIONS_TYPES.BUG_REMOVED | ACTIONS_TYPES.BUG_RESOLVED, payload: { } }} action
 */

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      const stateUpdated = { ...state[index], resolved: true };
      return [
        ...state.slice(0, index),
        stateUpdated,
        ...state.slice(index + 1),
      ];

    default:
      return state;
  }
}
