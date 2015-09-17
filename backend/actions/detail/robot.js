import Tc from "tcomb";
import {Uid} from "shared/types/common";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/robot";
import router from "backend/routers/robot";

router.get("/:id",
  middlewares.createParseParams(Tc.struct({id: Uid})),
  middlewares.createParseQuery(Tc.Any),
  function handler(req, res, cb) {
    let item = DB[req.params.id];
    if (item) {
      let payload = {
        data: item,
      };
      return res.status(200).send(payload); // Status: ok
    } else {
      return cb();
    }
  }
);
