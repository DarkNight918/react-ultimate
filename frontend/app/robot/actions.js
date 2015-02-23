// IMPORTS =========================================================================================
let Axios = require("axios");
let Reflux = require("reflux");

// EXPORTS =========================================================================================
let Actions = Reflux.createActions({
  "entryIndex": {},
  "entryDetail": {},
  "entryAdd": {},
  "entryEdit": {},

  "doAdd": {},
  "doEdit": {},
  "doRemove": {},
});

/*
Actions.postModel.listen((opts) => {
  //opts.headers["Content-Type"] = "application/json";
  let {headers, data} = opts;
  Axios.post(`/api/robots/`, {headers, data})
    .then((res) => {
      this.completed(res.data);
    })
    .catch((res) => {
      // TODO pull data back ?!
      this.failed(res.status);
    });
});

Actions.putModel.listen((opts) => {
  //opts.headers["Content-Type"] = "application/json";
  let {id, headers, data} = opts;
  Axios.put(`/api/robots/${id}`, {headers, data})
    .then((res) => {
      this.completed(res.data);
    }).catch((res) => {
      // TODO pull data back ?!
      this.failed(res.status);
    });
});
*/

export default Actions;
