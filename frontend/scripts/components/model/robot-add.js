// IMPORTS =========================================================================================
import {map} from "ramda";
import Class from "classnames";
import {branch} from "baobab-react/decorators";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import modelValidators from "shared/validators/robot";
import modelActions from "frontend/actions/robot";
import {ShallowComponent, DeepComponent} from "frontend/components/simple";
import {Error, Loading, NotFound} from "frontend/components/page";
import {Form} from "frontend/components/form";

// COMPONENTS ======================================================================================
@branch({
  cursors: {
    robots: "robots",
  },
})
export default class RobotAdd extends Form {
  static loadData = modelActions.loadIndex;

  constructor(props) {
    super();
    this.state = {
      // Raw state for all fields
      form: {
        name: undefined,
        assemblyDate: undefined,
        manufacturer: undefined,
      },
      // Validated and converter state for action
      model: {
        name: undefined,
        assemblyDate: undefined,
        manufacturer: undefined,
      },
      // Errors
      errors: {},
    };
  }

  render() {
    let {loading, loadError} = this.props.robots;
    let form = this.state.form;

    if (loading) {
      return <Loading/>;
    } else if (loadError) {
      return <Error loadError={loadError}/>;
    } else {
      return (
        <DocumentTitle title={"Add Robot"}>
          <div>
            <ModelActions {...this.props}/>
            <section className="container margin-top-lg">
              <div className="row">
                <div className="col-xs-12 col-sm-9">
                  <h1 className="nomargin-top">Add Robot</h1>
                  <fieldset>
                    <div className={Class("form-group", {
                      required: false,
                      error: this.hasErrors("name"),
                    })}>
                      <label htmlFor="name">Name</label>
                      <input type="text"
                        value={form.name}
                        onBlur={() => this.validate("name")}
                        onChange={this.makeHandleChange("name")}
                        id="name" ref="name"
                        className="form-control"/>
                      <div className={Class("help", {
                        error: this.hasErrors("name"),
                      })}>
                        {map(message => <span key="">{message}</span>, this.getErrors("name"))}
                      </div>
                    </div>

                    <div className={Class("form-group", {
                      required: false,
                      error: this.hasErrors("assemblyDate"),
                    })}>
                      <label htmlFor="assemblyDate">Assembly Date</label>
                      <input type="date"
                        value={form.assemblyDate}
                        onBlur={() => this.validate("assemblyDate")}
                        onChange={this.makeHandleChange("assemblyDate")}
                        id="assemblyDate" ref="assemblyDate"
                        className="form-control"/>
                      <div className={Class("help", {
                        error: this.hasErrors("assemblyDate"),
                      })}>
                        {map(message => <span key="">{message}</span>, this.getErrors("assemblyDate"))}
                      </div>
                    </div>

                    <div className={Class("form-group", {
                      required: false,
                      error: this.hasErrors("manufacturer"),
                    })}>
                      <label htmlFor="manufacturer">Manufacturer</label>
                      <input type="text"
                        value={form.manufacturer}
                        onBlur={() => this.validate("manufacturer")}
                        onChange={this.makeHandleChange("manufacturer")}
                        id="manufacturer" ref="manufacturer"
                        className="form-control"/>
                      <div className={Class("help", {
                        error: this.hasErrors("manufacturer"),
                      })}>
                        {map(message => <span key="">{message}</span>, this.getErrors("manufacturer"))}
                      </div>
                    </div>
                  </fieldset>
                  <div className="btn-group">
                    <button className="btn btn-default" type="button" onClick={this.handleReset}>Reset</button>
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit} disabled={this.hasErrors()}>Submit</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </DocumentTitle>
      );
    }
  }

  handleSubmit() {
    this.validate().then(isValid => {
      if (isValid) {
        alert("Submit will be here soon!");
        // modelActions.addModel(this.state.model);
      } else {
        alert("Can't submit form with errors");
      }
    });
  }

  get schema() {
    return modelValidators.model;
  }
}

class ModelActions extends ShallowComponent {
  render() {
    let robots = this.props.robots;
    let query = {
      filters: robots.filters,
      sorts: robots.sorts,
      page: {
        offset: robots.offset,
        limit: robots.limit,
      }
    };

    return (
      <div id="actions">
        <div className="container">
          <div className="btn-group btn-group-sm pull-left">
            <Link to="robot-index" query={query} className="btn btn-gray-light" title="Back to list">
              <span className="fa fa-arrow-left"></span>
              <span className="hidden-xs margin-left-sm">Back to list</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

/*
<TextInput label="Name" placeholder="Name" id="model.name" form={this}/>
<TextInput label="Assembly Date" placeholder="Assembly Date" id="model.assemblyDate" form={this}/>
<TextInput label="Manufacturer" placeholder="Manufacturer" id="model.manufacturer" form={this}/>
*/

//(this.validatorTypes().name._flags.presence == "required")
//(this.validatorTypes().assemblyDate._flags.presence == "required")
//(this.validatorTypes().manufacturer._flags.presence == "required")