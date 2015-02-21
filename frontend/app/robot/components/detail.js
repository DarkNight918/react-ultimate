// IMPORTS =========================================================================================
let isObject = require("lodash.isobject");
let isString = require("lodash.isstring");
let React = require("react");
let Router = require("react-router");
let {Link, RouteHandler} = Router;
let Reflux = require("reflux");
let DocumentTitle = require("react-document-title");
let Loading = require("../../common/components/loading");
let NotFound = require("../../common/components/not-found");
let Actions = require("../actions");
let Store = require("../store");

// EXPORTS =========================================================================================
let Detail = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connectFilter(Store, "model", function(models) {
      let id = this.getParams().id;
      return models.get(id);
    })
  ],

  componentDidMount() {
    Actions.entryDetail(this.getParams().id);
  },

  render() {
    if (isObject(this.state.model)) {
      let model = this.state.model;
      return (
        <DocumentTitle title={"Detail " + model.get("name")}>
          <div>
            <div id="page-actions">
              <div className="container">
                <div className="btn-group btn-group-sm pull-left">
                  <Link to="robot-index" className="btn btn-gray-light" title="Back to list">
                    <span className="fa fa-arrow-left"></span>
                    <span className="hidden-xs margin-left-sm">Back to list</span>
                  </Link>
                </div>
                <div className="btn-group btn-group-sm pull-right">
                  <Link to="robot-edit" params={{id: model.get("id")}} className="btn btn-orange" title="Edit">
                    <span className="fa fa-edit"></span>
                  </Link>
                  <a className="btn btn-red" title="Delete" onClick={this.onRemove}>
                    <span className="fa fa-times"></span>
                  </a>
                </div>
              </div>
            </div>
            <section className="container margin-top-lg">
              <div className="row">
                <div className="col-xs-12 col-sm-3">
                  <div className="thumbnail thumbnail-robot">
                    <img src={"http://robohash.org/" + model.get("id") + "?size=200x200"} width="200px" height="200px"/>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-9">
                  <h1 className="nomargin-top">{model.get("name")}</h1>
                  <dl>
                    <dt>Serial Number</dt><dd>{model.get("id")}</dd>
                    <dt>Assembly Date</dt><dd>{model.get("assemblyDate")}</dd>
                    <dt>Manufacturer</dt><dd>{model.get("manufacturer")}</dd>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </DocumentTitle>
      );
    } else if (isString(this.state.model)) {
      return <NotFound/>;
    }
    else {
      return <Loading/>;
    }
  },
});

export default Detail;
