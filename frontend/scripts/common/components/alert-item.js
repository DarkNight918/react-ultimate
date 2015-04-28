// IMPORTS =========================================================================================
import classNames from "classnames";
import React from "react";
import {Link} from "react-router";

import commonActions from "frontend/common/actions";

// EXPORTS =========================================================================================
let Expire = React.createClass({
  propTypes: {
    delay: React.PropTypes.number,
    //onExpire: React.PropTypes.function,
  },

  getDefaultProps() {
    return {
      delay: 500,
      //onExpire: undefined,
    };
  },

  componentDidMount() {
    this.startTimer();
  },

  componentWillReceiveProps(nextProps) {
    // Reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.startTimer();
    }
  },

  startTimer() {
    let model = this.props.model;

    // Clear existing timer
    if (this._timer !== undefined) {
      clearTimeout(this._timer);
    }

    // Hide after `model.delay` ms
    if (this.props.delay !== undefined) {
      this._timer = setTimeout(() => {
        if (this.props.onExpire !== undefined) {
          this.props.onExpire();
        }
        delete this._timer;
      }, this.props.delay);
    }
  },

  render() {
    return <div>{this.props.children}</div>;
  },
});

let CloseLink = React.createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  },

  render() {
    return (
      <a className="close pull-right" href="#" onClick={this.handleClick}>&times;</a>
    );
  }
});

let Item = React.createClass({
  propTypes: {
    model: React.PropTypes.object,
  },

  render() {
    let model = this.props.model;

    let classes = classNames({
      "alert": true,
      ["alert-" + model.category]: true,
    });

    let result = (
      <div className={classes} {...this.props}>
        {model.closable ? <CloseLink onClick={commonActions.alert.remove.bind(this, model.id)}/> : ""}
        {model.message}
      </div>
    );

    if (model.expire) {
      result = <Expire onExpire={commonActions.alert.remove.bind(this, model.id)} delay={model.expire}>{result}</Expire>;
    }

    return result;
  },
});

export default Item;


/*
Notification.prototype.show = function () {
  if(this.options.fadeOut.enabled)
    this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(onClose, this));

  this.$element.append(this.$note);
  this.$note.alert();
};

Notification.prototype.hide = function () {
  if(this.options.fadeOut.enabled)
    this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(onClose, this));
  else onClose.call(this);
};

$.fn.notify = function (options) {
  return new Notification(this, options);
};
*/

// TODO check this https://github.com/goodybag/bootstrap-notify/tree/master/css/styles
