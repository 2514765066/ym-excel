import { createNewSortInstance } from "fast-sort";

export const naturalSort = createNewSortInstance({
  inPlaceSorting: true,
  comparer: new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  }).compare,
});
