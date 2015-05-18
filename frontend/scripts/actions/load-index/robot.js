// IMPORTS =========================================================================================
import {filter} from "ramda";
import Axios from "axios";
import {getTotalPages, recommendOffset} from "frontend/helpers/pagination";
import state from "frontend/state";
import {router} from "frontend/router";
import fetchIndex from "frontend/actions/fetch-index/robot";

// ACTIONS =========================================================================================
export default function loadIndex() {
  console.debug("loadIndex()");

  let cursor = state.select("robots");
  let total = cursor.get("total");
  let models = cursor.get("models");
  let filters = cursor.get("filters");
  let sorts = cursor.get("sorts");
  let offset = cursor.get("offset");
  let limit = cursor.get("limit");
  let pagination = cursor.get("pagination");

  handleInvalidOffset(total, offset, limit);
  if (!isCacheAvailable(total, offset, limit, pagination)) {
    fetchIndex(models, filters, sorts, offset, limit, pagination)
      .then(() => handleInvalidOffset());
  }
}

export function isCacheAvailable(total, offset, limit, pagination) {
  let ids = filter(v => v, pagination.slice(offset, offset + limit));
  if (ids && ids.length) {
    if (offset == recommendOffset(total, total, limit)) { // are we on the last page?
      let totalPages = getTotalPages(total, limit);
      return ids.length >= limit - ((totalPages * limit) - total);
    } else {
      return ids.length >= limit;
    }
  } else {
    return false;
  }
}

export function handleInvalidOffset(total, offset, limit) {
  if (total) {
    let recommendedOffset = recommendOffset(total, offset, limit);
    if (offset != recommendedOffset) {
      router.transitionTo(undefined, undefined, {page: {offset: recommendedOffset}});
    }
  }
}
