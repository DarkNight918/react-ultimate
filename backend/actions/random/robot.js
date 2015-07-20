import makeModel from "shared/makers/robot";
import middlewares from "backend/middlewares";
import router from "backend/routers/robot";

// ROUTES ==========================================================================================
router.get("/random",
  middlewares.createParseQuery({}),
  function handler(req, res, cb) {
    let model = makeModel();
    let payload = {
      data: model,
    };
    return res.status(200).send(payload); // Status: ok
  }
);
