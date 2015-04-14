// IMPORTS =========================================================================================
let Joi = require("joi");
let toSingleMessage = require("backend/common/helpers");

// MIDDLEWARES =====================================================================================
export default function createParseQuery(scheme, options={allowUnknown: true}) {
  if (!scheme) throw Error("`scheme` is required");
  return function parseQuery(req, res, cb) {
    let result = Joi.validate(req.query, scheme, options);
    if (result.error) {
      return res.status(400).render("errors/400.html", {
        errors: toSingleMessage(result)
      });
    } else {
      req.query = result.value;
      return cb();
    }
  };
}