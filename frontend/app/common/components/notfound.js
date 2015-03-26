// IMPORTS =========================================================================================
let React = require("react");
let ReactRouter = require("react-router");
let {Link, RouteHandler} = ReactRouter;
let DocumentTitle = require("react-document-title");

// EXPORTS =========================================================================================
let NotFound = React.createClass({
  render() {
    return (
      <DocumentTitle title="Not Found">
        <section className="container page">
          <h1>Page not Found</h1>
          <p>Something is wrong</p>
        </section>
      </DocumentTitle>
    );
  }
});

export default NotFound;
