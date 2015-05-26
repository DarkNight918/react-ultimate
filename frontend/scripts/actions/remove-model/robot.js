// IMPORTS =========================================================================================
import Axios from "axios";
import {recalculatePaginationWithoutModel} from "frontend/helpers/pagination";
import state from "frontend/state";
import {indexRouter} from "frontend/router";
import alertActions from "frontend/actions/alert";
import {handleInvalidOffset} from "../load-index/robot";
import fetchIndex from "../fetch-index/robot";

// CURSORS =========================================================================================
let urlCursor = state.select("url");
let modelCursor = state.select("robots");

// ACTIONS =========================================================================================
export default function removeModel(id) {
  console.debug(`removeModel(${id})`);

  let filters = modelCursor.get("filters");
  let sorts = modelCursor.get("sorts");
  let offset = modelCursor.get("offset");
  let limit = modelCursor.get("limit");
  let total = modelCursor.get("total");
  let models = modelCursor.get("models");
  let pagination = modelCursor.get("pagination");
  let model = modelCursor.select("models").get(id);

  // Optimistic action
  modelCursor.set("loading", true);
  modelCursor.set("total", total - 1);
  modelCursor.set("pagination", recalculatePaginationWithoutModel(filters, sorts, models, pagination, id));
  modelCursor.select("models").unset(id);

  let newTotal = modelCursor.get("total");
  let newModels = modelCursor.get("models");
  let newPagination = modelCursor.get("pagination");

  return Axios.delete(`/api/robots/${id}`)
    .then(response => {
      modelCursor.merge({
        loading: false,
        loadError: undefined
      });

      // Upload data
      if (!newPagination[offset + limit - 1]) {
        fetchIndex(filters, sorts, offset + limit - 1, 1);
      }

      // Transition to index page
      let currentRoute = urlCursor.get("route");
      if (currentRoute != "robot-index") {
        indexRouter.transitionTo("robot-index");
      }

      // Add alert
      alertActions.addModel({message: "Action `Robot:removeModel` succeed", category: "success"});
      return response.status;
    })
    .catch(response => {
      if (response instanceof Error) {
        throw response;
      } else {
        // Cancel action
        modelCursor.merge({
          loading: false,
          loadError: {
            status: response.status,
            description: response.statusText,
            url: url
          }
        });
        modelCursor.set("total", total);
        modelCursor.set("models", models);
        modelCursor.set("pagination", pagination);

        // Add alert
        alertActions.addModel({message: "Action `Robot:removeModel` failed: " + loadError.description, category: "error"});
        return response.status;
      }
    });

  /* Async-Await style. Wait for proper IDE support
  // Optimistic action
  ...

  let response = {data: []};
  try {
    response = await Axios.put(url, newModel);
  } catch (response) {
    ...
  } // else
    ...
  */
}
