import api from "shared/api/monster";
import state from "frontend/state";
import loadModel from "frontend/actions/load-model/monster";

// CURSORS =========================================================================================
let $url = state.select("url");
let $data = state.select(api.plural);

// ACTIONS =========================================================================================
export default function establishModel() {
  console.debug(api.plural + `establishModel()`);

  $data.set("id", $url.get("params").id);

  return loadModel();
}
