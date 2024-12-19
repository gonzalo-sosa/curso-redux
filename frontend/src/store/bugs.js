import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

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
      bugs.loading = false;
      bugs.lastFetch = Date.now();
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
      const { id: bugId, userId } = action.payload;
      const bugToUpload = list.find(({ id }) => id === bugId);
      bugToUpload.userId = userId;
    },
  },
});

const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsRequested,
  bugsRequestedFailed,
  bugsReceived,
} = bugSlice.actions;
export default bugSlice.reducer;

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

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  console.log(lastFetch);
  if (lastFetch) {
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < 10) return;
  }

  return dispatch(
    apiCallBegan({
      url,
      method: "get",
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestedFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });
