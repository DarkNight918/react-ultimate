import {keys, values} from "ramda";
import {filterByAll, sortByAll} from "shared/helpers/common";
import commonValidators from "shared/validators/common";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/alert";
import router from "backend/routers/alert";

// ROUTES ==========================================================================================
router.get("/",
  middlewares.createParseQuery(commonValidators.urlQuery),
  function handler(req, res, cb) {
    let filters = req.query.filters;
    let sorts = req.query.sorts;
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 20;

    let models = values(DB);
    if (filters) {
      models = filterByAll(filters, models);
    }
    if (sorts) {
      models = sortByAll(sorts, models);
    }
    let total = models.length;
    models = models.slice(offset, offset + limit);

    let payload = {
      data: models,
      meta: {
        page: {offset, limit, total}
      }
    };
    return res.status(200).send(payload); // Status: ok
  }
);

router.get("/total",
  middlewares.createParseQuery({}),
  function handler(req, res, cb) {
    let filters = req.query.filters;

    let models = values(DB);
    if (filters) {
      models = filterByAll(filters, models);
    }
    let total = models.length;

    let payload = {
      data: total,
    };
    return res.status(200).send(payload); // Status: ok
  }
);
