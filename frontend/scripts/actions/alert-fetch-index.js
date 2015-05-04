// IMPORTS =========================================================================================
import Axios from "axios";
import state from "frontend/state";

// ACTIONS =========================================================================================
export default function fetchIndex(filters, sorts, offset, limit) {
  console.debug("fetchIndex");

  let url = `api/alerts`;
  let cursor = state.select("alerts");
  let query = formatJsonApiQuery(filters, sorts, offset, limit);

  cursor.merge({
    loading: false,
    loadError: undefined,
    total: 0,
    models: {},
  });

  return Promise.resolve(200); // HTTP response.status
}