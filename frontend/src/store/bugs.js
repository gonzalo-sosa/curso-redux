import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

// Actions Types
// const ACTIONS_TYPES = {
//   BUG_ADDED: "bugAdded",
//   BUG_REMOVED: "bugRemoved",
//   BUG_RESOLVED: "bugResolved",
// };

// Actions Creators
// const bugAdded = createAction(ACTIONS_TYPES.BUG_ADDED);
// const bugRemoved = createAction(ACTIONS_TYPES.BUG_REMOVED);
// const bugResolved = createAction(ACTIONS_TYPES.BUG_RESOLVED);

// export const actions = {
//   bugAdded,
//   bugRemoved,
//   bugResolved,
// };

// let lastId = 0;

// /**
//  * Reducer, actualiza el estado global de acuerdo a la acción indicada
//  * @param {[]} state
//  * @param {{ type: ACTIONS_TYPES.BUG_ADDED | ACTIONS_TYPES.BUG_REMOVED | ACTIONS_TYPES.BUG_RESOLVED, payload: { } }} action
//  */

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];

//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case bugResolved.type:
//       const index = state.findIndex((bug) => bug.id === action.payload.id);
//       const stateUpdated = { ...state[index], resolved: true };
//       return [
//         ...state.slice(0, index),
//         stateUpdated,
//         ...state.slice(index + 1),
//       ];

//     default:
//       return state;
//   }
// }

// Crea un reducer con estado inicial y un objeto con las funciones a ejecutar por cada acción
// El código ejecutado dentro de cada puede ser mutable ya que redux utiliza immer por detrás
// let lastId = 0;

// export default createReducer([], (builder) => {
//   builder
//     .addCase(bugAdded, (bugs, action) => {
//       bugs.push({
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false,
//       });
//     })
//     .addCase(bugRemoved, (bugs, action) => {
//       bugs = bugs.filter(({ id }) => id !== action.payload.id);
//     })
//     .addCase(bugResolved, (bugs, action) => {
//       const bugToUpdate = bugs.find(({ id }) => id === action.payload.id);
//       bugToUpdate.resolved = true;
//     })
//     .addDefaultCase((bugs, action) => {});
// });

let lastId = 0;

const bugSlice = createSlice({
  name: "bugs",
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestedFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },
    bugAdded: ({ list }, action) => {
      list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: ({ list }, action) => {
      list = list.filter(({ id }) => id !== action.payload.id);
    },
    bugResolved: ({ list }, action) => {
      const bugToUpdate = list.find(({ id }) => id === action.payload.id);
      bugToUpdate.resolved = true;
    },
    bugAssignedToUser: ({ list }, action) => {
      const { bugId, userId } = action.payload;
      const bugToUpload = list.find(({ id }) => id === bugId);
      bugToUpload.userId = userId;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsRequested,
  bugsRequestedFailed,
  bugsReceived,
} = bugSlice.actions;
export default bugSlice.reducer;

// Selectors
// /**
//  * Retorna los bugs con la propiedad "resolved" en "false"
//  * @param {state: { entities }}
//  * @returns {[]}
//  */
// export const getUnresolvedBugs = ({ entities }) =>
//   entities.bugs.filter(({ resolved }) => !resolved);

// Memoization
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  ({ list }) => list.filter(({ resolved }) => !resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    ({ list }) => list.filter((bug) => bug.userId === userId)
  );

// Action Creators

const url = "/bugs";

export const loadBugs = () =>
  apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestedFailed.type,
  });
