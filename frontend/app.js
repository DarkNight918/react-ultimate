import "babel/polyfill";
import "shared/shims"; // TODO except for prerender (isomorphic) step, because babel-node auto-injects it's polyfill
import {filter, forEach, keys, map, pipe} from "ramda";
import React from "react";
import {create as createRouter, HistoryLocation} from "react-router";
import {normalize} from "shared/helpers/common";
import commonValidators from "shared/validators/common";
import state from "frontend/state";
import alertActions from "frontend/actions/alert";
import {processAlertQueue} from "frontend/alerts";
import {processAjaxQueue} from "frontend/ajax";
import routes from "frontend/routes";
import "frontend/less/theme.less";

// CURSORS =========================================================================================
let $url = state.select("url");

// APP =============================================================================================
window._router = createRouter({
  routes: routes,
  location: HistoryLocation
});

window._router.run((Application, url) => {
  let route =  url.routes.slice(-1)[0];

  $url.set("route", route.name);
  $url.set("path", route.path);
  $url.set("params", normalize(url.params));
  $url.set("query", normalize(url.query));

  pipe(
    filter(route => route.handler.loadData),
    forEach(route => route.handler.loadData())
  )(url.routes);

  React.render(<Application/>, document.getElementById("app"));
});

// Request alert index once (TODO this should be realtime with push notifications)
//alertActions.fetchIndex();

setImmediate(processAlertQueue);
setImmediate(processAjaxQueue);
