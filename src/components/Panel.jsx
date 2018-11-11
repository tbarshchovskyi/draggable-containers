import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";


@observer
class Panel extends React.Component {
  @observable editMode = false
  @observable panelText = ''

  onEdit = () => {
    this.editMode = true
  }

  saveText = (e) => {
    this.editMode = false
    this.panelText = e.target.value
  }

  render() {
    const { onAddPanel, onRemovePanel, onLockPanel } = this.props

    const editSection = this.editMode ? (
      <textarea autoFocus defaultValue='Type something here...' onBlur={this.saveText} />
    ) : (
      <div className="text-area" onClick={this.onEdit}>
        <div className="edit-label">
          <i className="glyphicon glyphicon-pencil"></i>
          <span>Click here to edit</span>
        </div>
      </div>
    )

    const panelTextSection = (
      <div className="text-area text" onClick={this.onEdit}>
        {this.panelText}
      </div>
    )

    return (
      <div>
        <div className="panel-header">
          <i className="glyphicon glyphicon-lock" onClick={onLockPanel}></i>
          <i className="glyphicon glyphicon-pencil" onClick={this.onEdit}></i>
          <i className="glyphicon glyphicon-trash" onClick={onRemovePanel}></i>
          <i className="glyphicon glyphicon-move"></i>
        </div>

        <span className="plus-btn right" onClick={onAddPanel}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>

        {this.panelText ? panelTextSection : editSection}

        <span className="plus-btn bottom" onClick={onAddPanel}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>
      </div>
    );
  }
}

export default Panel;
