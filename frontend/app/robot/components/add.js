// IMPORTS =========================================================================================
let isObject = require("lodash.isobject");
let isString = require("lodash.isstring");
let {Map} = require("immutable");
let React = require("react");
let ReactAddons = require("react/addons").addons;
let ReactRouter = require("react-router");
let {Link, RouteHandler} = ReactRouter;
let Reflux = require("reflux");
let DocumentTitle = require("react-document-title");
let {Alert, Input, Button} = require("react-bootstrap");
let ValidationMixin = require("react-validation-mixin");
let Validators = require("shared/robot/validators");
let TextInput = require("frontend/common/elements/text-input");
let Loading = require("frontend/common/components/loading");
let NotFound = require("frontend/common/components/not-found");
let Actions = require("frontend/robot/actions");
let Store = require("frontend/robot/stores/robots");

// EXPORTS =========================================================================================
let Add = React.createClass({
  mixins: [
    ValidationMixin,
  ],

  validatorTypes() {
    return {
      model: Validators.model
    };
  },

  validatorData() {
    console.log("RobotAdd.validatorData", this.state);
    return {
      model: this.state.model.toJS()
    };
  },

  getInitialState() {
    return {
      model: Map({
        name: undefined,
        assemblyDate: undefined,
        manufacturer: undefined,
      }),
    };
  },

  render() {
    if (isObject(this.state.model)) {
      let model = this.state.model;
      return (
        <DocumentTitle title={"Add Robot"}>
          <div>
            <div id="page-actions">
              <div className="container">
                <div className="btn-group btn-group-sm pull-left">
                  <Link to="robot-index" className="btn btn-gray-light" title="Back to list">
                    <span className="fa fa-arrow-left"></span>
                    <span className="hidden-xs margin-left-sm">Back to list</span>
                  </Link>
                </div>
              </div>
            </div>
            <section className="container">
              <div className="thumbnail pull-left margin-top nopadding">
                {/*TODO add "undefined" avatar */}
                {/*<img src={"http://robohash.org/" + model.get("id") + "?size=200x200"} width="200px" height="200px"/>*/}
              </div>
              <h1>Add Robot</h1>
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <TextInput label="Name" placeholder="Name" id="model.name" form={this}/>
                  <TextInput label="Assembly Date" placeholder="Assembly Date" id="model.assemblyDate" form={this}/>
                  <TextInput label="Manufacturer" placeholder="Manufacturer" id="model.manufacturer" form={this}/>
                </fieldset>
                <div className="buttons">
                  <button className="btn" type="button" onClick={this.handleReset}>Reset</button>
                  <button className="btn" type="submit">Submit</button>
                </div>
              </form>
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

  // Dirty hacks with setTimeout until valid callback architecture (mixin 4.0 branch) --------------
  handleSubmit(event) {
    console.log("RobotAdd.handleSubmit");
    event.preventDefault();
    this.validate();
    setTimeout(() => {
      if (this.isValid()) {
        Actions.add(this.state.model);
        //this.setState({model: undefined}); // WTF with this ???
      } else {
        alert("Can't submit form with errors");
      }
    }, 500);
  },

  //handleReset(event) {
  //  event.preventDefault();
  //  this.setState(this.getInitialState());
  //  setTimeout(function() {
  //    alert("xxx")
  //  }, 200);
  //},
  // -----------------------------------------------------------------------------------------------
});

export default Add;
