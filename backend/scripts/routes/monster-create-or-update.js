// IMPORTS =========================================================================================
import {mergeDeep} from "shared/helpers/common";
import {makeMonster} from "shared/makers/monster";
import commonValidators from "shared/validators/common";
import monsterValidators from "shared/validators/monster";
import middlewares from "backend/middlewares";
import monstersDB from "backend/dbs/monster";
import router from "backend/routers/monster";

// ROUTES ==========================================================================================
router.put("/:id",
  middlewares.createParseParams(commonValidators.id),
  middlewares.createParseQuery({}),
  middlewares.createParseBody(monsterValidators.model),
  function handler(req, res, cb) {
    let oldModel = monstersDB[req.params.id];
    if (oldModel) {
      let newModel = mergeDeep(oldModel, req.body);
      monstersDB[newModel.id] = newModel;
      return res.status(204).send(); // Status: no-content
    } else {
      let newModel = mergeDeep(makeMonster(), req.body);
      monstersDB[newModel.id] = newModel;
      let response = {
        data: newModel,
      }
      return res.status(201).send(response); // Status: created
    }
  }
);