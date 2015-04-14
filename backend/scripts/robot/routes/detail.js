// IMPORTS =========================================================================================
let CommonValidators = require("shared/common/validators");
let RobotValidators = require("shared/robot/validators");
let createParseParams = require("backend/common/middlewares/parse-params");
let createParseQuery = require("backend/common/middlewares/parse-query");
let createParseBody = require("backend/common/middlewares/parse-body");
let router = require("backend/robot/router");
let robots = require("backend/robot/db");

// ROUTES ==========================================================================================
router.get("/robots/:id",
  createParseParams(CommonValidators.id),
  createParseQuery({}),
  function handler(req, res, cb) {
    let robot = robots.get(req.params.id);
    if (robot) {
      let response = robot; // TODO data
      return res.status(200).send(response); // Status: ok
    } else {
      return cb();
    }
  }
);