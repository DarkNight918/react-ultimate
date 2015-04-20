// IMPORTS =========================================================================================
let {Map} = require("immutable");

let CommonValidators = require("shared/common/validators");
let RobotValidators = require("shared/robot/validators");

let createParseParams = require("backend/common/middlewares/parse-params");
let createParseQuery = require("backend/common/middlewares/parse-query");
let createParseBody = require("backend/common/middlewares/parse-body");

let {generateRobot} = require("backend/robot/common/helpers");
let robots = require("backend/robot/common/db");
let router = require("backend/robot/common/router");

// ROUTES ==========================================================================================
router.post("/robots/",
  createParseQuery({}),
  createParseBody(RobotValidators.model),
  function handler(req, res, cb) {
    let robot = Map(generateRobot());
    robot = robot.mergeDeep(req.body);
    robots = robots.set(robot.get("id"), robot);
    let response = robot; // TODO data
    return res.status(201).send(response); // Status: created
  }
);