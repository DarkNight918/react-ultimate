// IMPORTS =========================================================================================
import makeRobot from "shared/makers/robot";
import middlewares from "backend/middlewares";
import router from "backend/routers/robot";

// ROUTES ==========================================================================================
router.get("/random",
  middlewares.createParseQuery({}),
  function handler(req, res, cb) {
    let model = makeRobot();
    let response = {
      data: model,
    };
    return res.status(200).send(response); // Status: ok
  }
);