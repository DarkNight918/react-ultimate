import Tc from "tcomb";
import {Uid} from "shared/types/common";
import {Robot} from "shared/types/robot";
import {parseAs} from "shared/parsers";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/robot";
import router from "backend/routers/robot";

router.put("/:id",
  middlewares.createParseParams(Tc.struct({id: Uid})),
  middlewares.createParseQuery(Tc.Any),
  middlewares.createParseBody(Robot),
  function handler(req, res, cb) {
    let oldItem = DB[req.params.id];
    let newItem = parseAs(req.body, Robot);
    DB[newItem.id] = newItem;
    if (oldItem) {
      return res.status(204).send(); // Status: no-content
    } else {
      let payload = {
        data: newItem,
      };
      return res.status(201).send(payload); // Status: created
    }
  }
);
