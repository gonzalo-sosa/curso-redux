import { describe, it, expect, beforeEach, vi } from "vitest";
import configureStore from "../src/store/configureStore";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  addBug,
  resolveBug,
  getUnresolvedBugs,
  loadBugs,
} from "../src/store/bugs";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(async () => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = (list = []) => ({
    entities: {
      bugs: {
        list,
      },
    },
  });

  it("should add the bug to the store if it's saved to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1, resolved: false };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should mark the bug as resolved if it's saved to the server", async () => {
    // Arrange
    const bugId = 2;
    const bug = { id: bugId };
    fakeAxios.onPost("/bugs").reply(200, bug);
    fakeAxios.onPatch(`/bugs/${bugId}`).reply(200, { ...bug, resolved: true });

    // Act
    // TODO: lastId no se reinicia en cada test
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(bugId));

    // Assert
    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server", async () => {
    // Arrange
    const bugId = 2;
    fakeAxios.onPatch(`/bugs/${bugId}`).reply(500);

    // Act
    await store.dispatch(resolveBug(bugId));

    // Assert
    expect(bugsSlice().list).toHaveLength(0);
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("if the bugs don't exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });
      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);

            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it("should be false after the bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  describe("selectors", () => {
    it("should return unresolved bugs", async () => {
      const state = createState([
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ]);
      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
