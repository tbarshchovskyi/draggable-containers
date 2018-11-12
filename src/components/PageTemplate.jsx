import React, { Fragment } from "react";
import PropTypes from 'prop-types'
import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";
import { Responsive, WidthProvider } from 'react-grid-layout';
import classNames from 'classnames';

import Panel from "./Panel";

/***
TODO
=====
1) Move all magic numbers to separate constant folder with constant files
2) Extract all strings for localization
***/

const COMPACT_TYPE_OPTIONS = ['vertical', 'horizontal', ''];
const ResponsiveGridLayout = WidthProvider(Responsive);

@observer
class PageTemplate extends React.Component {
  @observable compactType = COMPACT_TYPE_OPTIONS[0];

  getPanels = () => {
    const { layouts, layoutsData, addPanelBottom, addPanelRight,
            removePanel, lockPanel, saveText } = this.props.store

    const panels = layouts.lg.map((layout, j, layoutsArr) => {
      const panelsCount = layoutsArr.length;
      const layoutText = layoutsData[layout.i] || '';
      const lastLayout = layoutsArr[layoutsArr.length-1];
      const lastLayoutIndex = lastLayout.i;

      return (
        <div
          key={layout.i}
          className={classNames('panel', { static: layout && layout.static})}>
          <Panel
            panelsCount={panelsCount}
            onAddPanelBottom={(e) => addPanelBottom(lastLayoutIndex, layout, e)}
            onAddPanelRight={(e) => addPanelRight(lastLayoutIndex, layout, e)}
            onRemovePanel={(e) => removePanel(layout.i, e)}
            onLockPanel={(e) => lockPanel(layout.i, e)}
            onSaveText={(e) => saveText(e, layout.i)}
            panelText={layoutText} />
        </div>
      )
    })

    return panels;
  }

  onLayoutChange = (layout, layouts) => {
    this.props.store.layouts = layouts;
  }

  setCompactType = () => {
    let currentTypeIndex = COMPACT_TYPE_OPTIONS.indexOf(this.compactType);
    this.compactType = currentTypeIndex < (COMPACT_TYPE_OPTIONS.length-1) ?
      COMPACT_TYPE_OPTIONS[++currentTypeIndex] : COMPACT_TYPE_OPTIONS[0];
  }

  render() {
    return (
      <Fragment>
        <h2>Page template</h2>
        <div>
          <span>Compact Type:</span>
          <span
            className="compact-type-btn"
            onClick={this.setCompactType}>
            {this.compactType || 'none'}
          </span>
        </div>
        <ResponsiveGridLayout
          className="layout"
          currentBreakpoint="lg"
          layouts={this.props.store.layouts}
          breakpoints={{lg: 1200, sm: 768, xs: 480}}
          cols={{lg: 7, sm: 4, xs: 2}}
          margin={[18,18]}
          containerPadding={[30, 30]}
          measureBeforeMount={false}
          compactType={this.compactType || null}
          onLayoutChange={this.onLayoutChange}>
          {this.getPanels()}
        </ResponsiveGridLayout>
      </Fragment>
    );
  }
}

PageTemplate.displayName = "PageTemplate"

PageTemplate.propTypes = {
  store: PropTypes.object,
}

export default PageTemplate;
