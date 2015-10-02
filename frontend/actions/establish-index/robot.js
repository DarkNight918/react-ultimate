import {equals, filter} from "ramda";
import {ROBOT} from "shared/constants";
import api from "shared/api/robot";
import state from "frontend/state";
import loadIndex from "frontend/actions/load-index/robot";

let url$ = state.select("url");
let urlQuery$ = state.select("urlQuery");
let data$ = state.select(api.plural);

export default function establishIndex() {
  console.debug(api.plural + `.establishIndex()`);

  let urlQuery = urlQuery$.get();
  let urlFilters = urlQuery.filters;
  let urlSorts = urlQuery.sorts;
  let urlOffset = urlQuery.offset;
  let urlLimit = urlQuery.limit;

  let {filters, sorts} = data$.get();

  if (!equals(urlFilters || ROBOT.index.filters, filters)) {
    data$.set("filters", urlFilters || ROBOT.index.filters);
    if (true || !data$.get("fullLoad")) {
      /* TODO replace true with __newFilters_are_not_subset_of_oldFilters__ */
      // Pagination is messed up, do reset
      data$.merge({
        total: 0,
        pagination: [],
      });
    }
  }
  if (!equals(urlSorts || ROBOT.index.sorts, sorts)) {
    data$.set("sorts", urlSorts || ROBOT.index.sorts);
    if (!data$.get("fullLoad")) {
      // Pagination is messed up, do reset
      data$.merge({
        total: 0,
        pagination: [],
      });
    }
  }
  data$.set("offset", urlOffset || ROBOT.index.offset);
  data$.set("limit", urlLimit || ROBOT.index.limit);

  return loadIndex();
}
