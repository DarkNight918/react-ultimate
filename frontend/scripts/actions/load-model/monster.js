// IMPORTS =========================================================================================
import Axios from "axios";
import state from "frontend/state";
import fetchModel from "frontend/actions/fetch-model/monster";

// ACTIONS =========================================================================================
export default function loadModel() {
  console.debug("loadModel");

  let cursor = state.select("monsters");
  let models = cursor.get("models");
  let id = cursor.get("id");

  let model = models[id];
  if (!model) {
    fetchModel(id);
  }
}