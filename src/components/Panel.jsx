import React, { Fragment } from "react";
import PropTypes from 'prop-types'
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import classNames from 'classnames';

/***
TODO
=====
1) Move all magic numbers to separate constant folder with constant files
2) Extract all strings for localization
***/

@observer
class Panel extends React.Component {
  @observable editMode = false;

  onEdit = () => {
    this.editMode = true;
  }

  saveText = (e) => {
    this.props.onSaveText(e)
    this.editMode = false
  }

  render() {
    const { panelsCount, panelText, onRemovePanel, onLockPanel, onAddPanelBottom, onAddPanelRight } = this.props;

    const textAreaPlaceholder = panelText ? <div className="text">{panelText}</div> : (
      <div className="edit-label">
        <i className="glyphicon glyphicon-pencil"></i>
        <span>Click here to edit</span>
      </div>
    )

    const editSection = (this.editMode) ? (
      <div className="text-area-input">
        <textarea
          defaultValue={panelText}
          placeholder="Type something here..."
          onBlur={this.saveText}
          autoFocus={true} />
        </div>
    ) : (
      <div className="text-area" onClick={this.onEdit}>
        {textAreaPlaceholder}
      </div>
    )

    return (
      <Fragment>
        <div className="panel-header">
          <i className="glyphicon glyphicon-lock" onClick={onLockPanel}></i>
          <i className="glyphicon glyphicon-pencil" onClick={this.onEdit}></i>
          <i
            className={classNames('glyphicon glyphicon-trash', {disabled: panelsCount <= 1})}
            onClick={onRemovePanel}></i>
          <i className="glyphicon glyphicon-move"></i>
        </div>

        <span className="plus-btn right" onClick={onAddPanelRight}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>

        {editSection}

        <span className="plus-btn bottom" onClick={onAddPanelBottom}>
          <i className="glyphicon glyphicon-plus"></i>
        </span>
      </Fragment>
    );
  }
}

Panel.displayName = "Panel"

Panel.propTypes = {
  panelsCount: PropTypes.number,
  panelText: PropTypes.string,
  onRemovePanel: PropTypes.func,
  onLockPanel: PropTypes.func,
  onAddPanelBottom: PropTypes.func,
  onAddPanelRight: PropTypes.func
}

export default Panel;
