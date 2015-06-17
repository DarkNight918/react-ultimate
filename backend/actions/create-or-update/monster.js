import {mergeDeep} from "shared/helpers/common";
import Model from "shared/models/monster";
import commonValidators from "shared/validators/common";
import modelValidators from "shared/validators/monster";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/monster";
import router from "backend/routers/monster";

// ROUTES ==========================================================================================
router.put("/:id",
  middlewares.createParseParams(commonValidators.id),
  middlewares.createParseQuery({}),
  middlewares.createParseBody(modelValidators.model),
  function handler(req, res, cb) {
    let oldModel = DB[req.params.id];
    let newModel = Model(req.body);
    DB[newModel.id] = newModel;
    if (oldModel) {
      return res.status(204).send(); // Status: no-content
    } else {
      let response = {
        data: newModel,
      };
      return res.status(201).send(response); // Status: created
    }
  }
);
