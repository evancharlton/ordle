import localforage from "localforage";

export const store = (() => {
  return localforage.createInstance({
    name: "ordle",
    version: 1,
    storeName: "ordle",
  });
})();
