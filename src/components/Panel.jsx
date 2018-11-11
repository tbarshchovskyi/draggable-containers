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

  onSave = (e) => {
    console.log('ev',e)
    this.editMode = false
    this.panelText = 'My Text Test'
  }

  render() {
    const { onAddPanel, onRemovePanel, onLockPanel } = this.props
    const editSection = this.editMode ? (
      <textarea defaultValue='Type something here...' />
    ) : (
      <div className="text-area" onClick={this.onEdit}>
        <div className="edit-label">
          <i className="glyphicon glyphicon-pencil"></i>
          <span>Click here to edit</span>
        </div>
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

        {editSection}

        <span className="plus-btn bottom" onClick={onAddPanel}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>
      </div>
    );
  }
}

export default Panel;
