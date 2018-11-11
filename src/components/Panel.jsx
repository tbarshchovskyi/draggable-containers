import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";


@observer
class Panel extends React.Component {
  render() {
    const { onAddPanel, onRemovePanel } = this.props

    return (
      <div>
        <span className="panel-lock">

        </span>
        <div className="panel-header">
          <i className="glyphicon glyphicon-lock"></i>
          <i className="glyphicon glyphicon-pencil"></i>
          <i className="glyphicon glyphicon-trash" onClick={onRemovePanel}></i>
          <i className="glyphicon glyphicon-move"></i>
        </div>
        <span className="plus-btn right" onClick={onAddPanel}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>
        <div className="text-area">
          <i className="glyphicon glyphicon-pencil"></i>
          <span>Click here to edit</span>
        </div>
        <span className="plus-btn bottom" onClick={onAddPanel}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>
      </div>
    );
  }
}

export default Panel;
