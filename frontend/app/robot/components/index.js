// IMPORTS =========================================================================================
let React = require("react");
let ReactRouter = require("react-router");
let {Link, RouteHandler} = ReactRouter;
let Reflux = require("reflux");
let DocumentTitle = require("react-document-title");
let Actions = require("../actions");
let Store = require("../stores/robots");

// EXPORTS =========================================================================================
let Index = React.createClass({
  mixins: [Reflux.connect(Store, "models")],

  componentDidMount() {
    Actions.entryIndex();
  },

  render() {
    return (
      <DocumentTitle title="Robots">
        <div>
          <div id="page-actions">
            <div className="container">
              <div className="pull-right">
                <Link to="robot-add" className="btn btn-sm btn-green" title="Add">
                  <span className="fa fa-plus"></span>
                </Link>
              </div>
            </div>
          </div>
          <section className="container">
           {/*<h2>Collection demo</h2>

            <p>Intelligently rendering collections can be a bit tricky.</p>

            <p>
              <a href="https://github.com/ampersandjs/ampersand-view">ampersand-view's</a>
              <code>renderCollection()</code> method makes it simple.
            </p>

            <h3>Robots container</h3>
            <ul class="list-group" data-hook="robot-index"></ul>

            */}

            <h1>Robots</h1>
            <div className="row">
              {this.state.models.toArray().map(model => {
                return <div key={model.get("id")} className="col-sm-6 col-md-3">
                  <div className="panel panel-default" key={model.get("id")}>
                    <div className="panel-heading">
                      <h4 className="panel-title"><Link to="robot-detail" params={{id: model.get("id")}}>{model.get("name")}</Link></h4>
                    </div>
                    <div className="panel-body text-center nopadding">
                      <Link to="robot-detail" params={{id: model.get("id")}}>
                        <img src={'http://robohash.org/' + model.get("id") + '?size=200x200'} width="200px" height="200px"/>
                      </Link>
                    </div>
                    <div className="panel-footer">
                      <div className="clearfix">
                        <div className="btn-group btn-group-sm pull-right">
                          <Link to="robot-detail" params={{id: model.get("id")}} className="btn btn-blue" title="Detail">
                            <span className="fa fa-eye"></span>
                          </Link>
                          <Link to="robot-edit" params={{id: model.get("id")}} className="btn btn-orange" title="Edit">
                            <span className="fa fa-edit"></span>
                          </Link>
                          <a className="btn btn-red" title="Remove" onClick={Actions.doRemove.bind(this, model.get("id"))}>
                            <span className="fa fa-times"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </div>

          {/*<p>Try it by clicking the buttons</p>
            <div className="buttons btn-group">
              {/*<button className="btn btn-default" data-hook="reset">Reset Collection</button>
               <button className="btn btn-default" data-hook="remove">Remove Collection</button>
               <button className="btn btn-default" data-hook="shuffle">Shuffle Collection</button>
               <button className="btn btn-default" data-hook="fetch">Refetch Collection</button>
               <button className="btn btn-default" data-hook="add">Add Random</button>}
            </div>
            */}
          </section>
        </div>
      </DocumentTitle>
    );
  }
});

export default Index;
