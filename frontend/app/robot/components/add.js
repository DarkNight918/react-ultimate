// IMPORTS =========================================================================================
let debounce = require("lodash.debounce");
let React = require("react/addons");
let Router = require("react-router");
let {Link, RouteHandler} = Router;
let Reflux = require("reflux");
let LensedStateMixin = require("react-lensed-state");
let DocumentTitle = require("react-document-title");
let Alert = require("react-bootstrap").Alert;
let Input = require("react-bootstrap").Input;
let Button = require("react-bootstrap").Button;
let ValidationMixin = require("react-validation-mixin");
let Joi = require("joi");
let Loading = require("../../common/components/loading");
let Actions = require("../actions");
let Store = require("../store");

// EXPORTS =========================================================================================
let Add = React.createClass({
  mixins: [
    Router.Navigation,
    LensedStateMixin,
    ValidationMixin,
  ],

  validatorTypes() {
    return {
      model: {
        id: Joi.string().required(), // TODO uuid
        assemblyDate: Joi.date().max("now").required(),
        manufacturer: Joi.string().required(),
      }
    };
  },

  validatorData() {
    console.log("Add.validatorData!");
    return this.state.toJS();
  },

  getInitialState() {
    return {
      model: {
        id: undefined,
        assemblyDate: undefined,
        manufacturer: undefined
      },
    };
  },

  render() {
    if (true) {
      let model = this.state.model;
      return (
        <DocumentTitle title={"Add Robot"}>
          <div>
            <div id="page-actions">
              <div className="container">
                <div className="pull-left">
                  <Link to="robot-index" className="btn btn-sm btn-gray-lighter" title="Back to list">
                    <span className="fa fa-arrow-left"></span>
                    <span className="hidden-xs margin-left-sm">Back to list</span>
                  </Link>
                </div>
                <div className="btn-group btn-group-sm pull-right">
                  <Link to="robot-detail" params={{id: model.id}} className="btn btn-blue" title="Detail">
                    <span className="fa fa-eye"></span>
                  </Link>
                  <a className="btn btn-red" title="Delete" onClick={this.onRemove}>
                    <span className="fa fa-times"></span>
                  </a>
                </div>
              </div>
            </div>
            <section className="container">
              <div className="thumbnail pull-left margin-top nopadding">
                <img src={"http://robohash.org/" + model.id + "?size=200x200"} width="200px" height="200px"/>
              </div>
              <h1>Add robot</h1>
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className={this.getClasses("id")}>
                    <label htmlFor="id">Serial Number</label>
                    <input type="id" id="id" valueLink={this.linkState("id")} onBlur={this.handleUnfocusFor("id")} className="form-control" placeholder="serialNumber"/>
                    {this.getValidationMessages("id").map(this.renderHelpText)}
                  </div>

                  <div className={this.getClasses("assemblyDate")}>
                    <label htmlFor="assemblyDate">Assembly Date</label>
                    <input type="assemblyDate" id="assemblyDate" valueLink={this.linkState("assemblyDate")} onBlur={this.handleUnfocusFor("assemblyDate")} className="form-control" placeholder="Assembly Date" />
                    {this.getValidationMessages("assemblyDate").map(this.renderHelpText)}
                  </div>

                  <div className={this.getClasses("manufacturer")}>
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input type="manufacturer" id="manufacturer" valueLink={this.linkState("manufacturer")} onBlur={this.handleUnfocusFor("password")} className="form-control" placeholder="Manufacturer" />
                    {this.getValidationMessages("manufacturer").map(this.renderHelpText)}
                  </div>
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
    } else {
      return <Loading/>;
    }
  },

  renderHelpText: function(message) {
    return (
      <span className="help-block">{message}</span>
    );
  },

  getClasses: function(key) {
    return React.addons.classSet({
      'form-group': true,
      'has-error': !this.isValid(key)
    });
  },


});

export default Add;


let ExampleInput = React.createClass({
  mixins: [
    Router.Navigation,
    ValidationMixin,
  ],

  //propTypes: {
    //name: React.PropTypes.string.isRequired,
    //type: React.PropTypes.oneOf(INPUT_TYPES).isRequired,
    //placeholder: React.PropTypes.string,
    //label: React.PropTypes.string,
    //required: React.PropTypes.bool,
    //oneOf: React.PropTypes.array,
    //minLength: React.PropTypes.number
  //},

  //getInitialState() {
  //  this.validateDebounced = LD.debounce(this.validate, 1000);
  //  return {
  //    value: "",
  //    error: false,
  //    validationStarted: false,
  //  };
  //},

  //prepareToValidate() {
  //
  //},
  //
  //componentWillMount() {
  //  let startValidation = function() {
  //    this.setState({
  //      validationStarted: true
  //    }).bind(this);
  //  };
  //
  //  if (!this.props.value) {
  //    startValidation();
  //  } else {
  //    this.prepareToValidate = LD.debounce(startValidation, 1000);
  //  }
  //},

  //handleChange(e) {
  //  this.validateDebounced();
    //if (!this.state.validationStarted) {
    //  this.prepareToValidate();
    //}
    //this.props.onChange && !this.props.onChange(e);
  //},
  //
  //onBlur(e) {
  //  this.validate();
  //},

  //onFocus(e) {
  //  this.setState({error: false});
  //  //e.stopPropagation();
  //},

  //validationState() {
  //  let length = this.state.value.length;
  //  if (length >= this.props.minLength)  {
  //    return "success";
  //  }
  //  else {
  //    return "error";
  //  }
  //},

  //validate() {
  //  var value = this.refs.input.getValue();
  //  var error;
  //  if (this.props.required && !value)
  //      error = "required";
  //  else if (this.props.oneOf && !(value in this.props.oneOf))
  //      error = "oneOf";
  //  else if (this.props.minLength && value.length < this.props.minLength)
  //      error = "minLength";
  //  this.setState({error: error});
  //},

  //onChange() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    //console.debug("DemoInput.onChange");
    //console.debug("value:", this.refs.input.getValue());
    //this.setState({
    //  value: this.refs.input.getValue()
    //});
  //},

  render() {
    //let value = this.props.valueLink.value;
    //let onChange = function(evt) {
    //  this.props.valueLink.requestChange(evt.target.value);
    //};
    let form = this.props.form;
    return (
      <Input
        type="text"
        placeholder="Enter text"
        label="Working example with validation"
        name={this.props.ref}
        test="test"
        data-test="test"
        valueLink={this.props.valueLink}
       />
    );
    // hasFeedback
    //help={form.getValidationMessages(this.props.ref).map(form.renderHelpText)}
    //  valueLink={this.linkState("value")}      onChange={this.handleChange}     bsStyle={this.state.error ? "error": "info"}
    //groupClassName="group-class"
    //wrapperClassName="wrapper-class"
    //labelClassName="label-class"
  }
});

/*
handleSubmit: debounce(function() {
    this.validate();
    //if (this.isValid()) {
    //  UserAction.signup(this.state);
    //}
  }, 500),*/

/*
<Input type="text" ref="id" label="Serial Number" placeholder="" valueLink={this.linkState("id")}/>
<Input type="text" ref="assemblyDate" label="Assembly Date" placeholder="" valueLink={this.linkState("assemblyDate")}/>
<Input type="text" ref="manufacturer" label="Manufacturer" placeholder="" valueLink={this.linkState("manufacturer")}/>
<Button type="submit">Submit</Button>
 */
