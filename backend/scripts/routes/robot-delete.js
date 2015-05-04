// IMPORTS =========================================================================================
import commonValidators from "shared/validators/common";
import middlewares from "backend/middlewares";
import robotsDB from "backend/dbs/robot";
import router from "backend/routers/robot";

// ROUTES ==========================================================================================
router.delete("/:id",
  middlewares.createParseParams(commonValidators.id),
  middlewares.createParseQuery({}),
  function handler(req, res, cb) {
    let model = robotsDB[req.params.id];
    if (model) {
      delete robotsDB[req.params.id];
      return res.status(204).send(); // Status: no-content
    } else {
      return cb();
    }
  }
);