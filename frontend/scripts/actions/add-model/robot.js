// IMPORTS =========================================================================================
import Axios from "axios";
import Robot from "shared/models/robot";
import {recalculatePaginationWithModel} from "frontend/helpers/pagination";
import state from "frontend/state";
import {router} from "frontend/router";
import alertActions from "frontend/actions/alert";

// ACTIONS =========================================================================================
export default function add(model) {
  let newModel = Robot(model);
  let id = newModel.id;
  let url = `/api/robots/${id}`;

  let cursor = state.select("robots");
  let total = cursor.get("total");
  let models = cursor.get("models");
  let filters = cursor.get("filters");
  let sorts = cursor.get("sorts");
  let pagination = cursor.get("pagination");

  // Optimistic action
  cursor.set("loading", true);
  cursor.set("total", total + 1);
  cursor.set("pagination", recalculatePaginationWithModel(filters, sorts, models, pagination, id));
  cursor.select("models").set(id, newModel);
  let newTotal = cursor.get("total");
  let newModels = cursor.get("models");
  let newPagination = cursor.get("pagination");

  return Axios.put(url, newModel)
    .then(response => {
      cursor.merge({loading: false, loadError: undefined});

      // Transition to detail page
      router.transitionTo("robot-detail", {id: newModel.id});

      // Add alert
      alertActions.addModel({message: "Action `Robot:addModel` succeed", category: "success"});

      return response.status;
    })
    .catch(response => {
      if (response instanceof Error) {
        throw response;
      } else {
        let loadError = {
          status: response.status,
          description: response.statusText,
          url: url
        };

        // Cancel action
        cursor.merge({loading: false, loadError});
        cursor.set("total", total);
        cursor.set("models", models);
        cursor.set("pagination", pagination);

        // Add alert
        alertActions.addModel({message: "Action `Robot:addModel` failed: " + loadError.description, category: "error"});

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
