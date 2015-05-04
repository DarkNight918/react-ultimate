// IMPORTS =========================================================================================
import isEqual from "lodash.isequal";
import {groupLength, recalculatePaginationWithSorts} from "frontend/helpers/pagination";
import state, {ZOMBIE} from "frontend/state";

// ACTIONS =========================================================================================
export default function setSorts(sorts=ZOMBIE.SORTS) {
  console.debug(`setSorts(${JSON.stringify(sorts)})`);

  let cursor = state.select("monsters");
  if (!isEqual(sorts, cursor.get("sorts"))) {
    cursor.set("sorts", sorts);
    if (groupLength(cursor.get("pagination")) >= cursor.get("total")) {
      // Full index loaded – can recalculate pagination
      let pagination = recalculatePaginationWithSorts(
        cursor.get("pagination"), sorts, cursor.get("models"), cursor.get("limit")
      );
      cursor.set("pagination", pagination);
    } else {
      // Part of index loaded – can only reset
      cursor.set("pagination", {});
    }
    state.commit();
  }
}
