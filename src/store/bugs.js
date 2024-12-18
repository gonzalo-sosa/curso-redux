// Actions Types
const ACTIONS_TYPES = {
  BUG_ADDED: "bugAdded",
  BUG_REMOVED: "bugRemoved",
  BUG_RESOLVED: "bugResolved",
};

// Actions Creators
const bugAdded = (description) => ({
  type: ACTIONS_TYPES.BUG_ADDED,
  payload: {
    description,
  },
});

const bugRemoved = (id) => ({
  type: ACTIONS_TYPES.BUG_REMOVED,
  payload: {
    id,
  },
});

const bugResolved = (id) => ({
  type: ACTIONS_TYPES.BUG_RESOLVED,
  payload: {
    id,
  },
});

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
    case ACTIONS_TYPES.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case ACTIONS_TYPES.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case ACTIONS_TYPES.BUG_RESOLVED:
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      const bugResolved = { ...state[index], resolved: true };
      return [...state.slice(0, index), bugResolved, ...state.slice(index + 1)];

    default:
      return state;
  }
}
