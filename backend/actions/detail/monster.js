import commonValidators from "shared/validators/common";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/monster";
import router from "backend/routers/monster";

// ROUTES ==========================================================================================
router.get("/:id",
  middlewares.createParseParams(commonValidators.id),
  middlewares.createParseQuery({}),
  function handler(req, res, cb) {
    let model = DB[req.params.id];
    if (model) {
      let payload = {
        data: model,
      };
      return res.status(200).send(payload); // Status: ok
    } else {
      return cb();
    }
  }
);
