// IMPORTS =========================================================================================
import Axios from "axios";
import {toObject} from "shared/helpers/common";
import Robot from "shared/models/robot";
import state from "frontend/state";
import alertActions from "frontend/actions/alert";

// CURSORS =========================================================================================
let modelCursor = state.select("robots");

// ACTIONS =========================================================================================
export default function fetchModel(id) {
  console.debug(`fetchModel(${id})`);

  modelCursor.set("loading", true);

  return Axios.get(`/api/robots/${id}`)
    .then(response => {
      let {data, meta} = response.data;
      let model = Robot(data);

      modelCursor.merge({
        loading: false,
        loadError: undefined
      });
      modelCursor.select("models").set(id, model);

      return response.status;
    })
    .catch(response => {
      if (response instanceof Error) {
        throw response;
      } else {
        modelCursor.merge({
          loading: false,
          loadError: {
            status: response.status,
            description: response.statusText,
            url: url
          }
        });

        // Add alert
        alertActions.addModel({message: "Action `Robot:fetchModel` failed: " + loadError.description, category: "error"});
        return response.status;
      }
    });
}
