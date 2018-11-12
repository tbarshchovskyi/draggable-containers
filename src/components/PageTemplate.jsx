import React, { Component } from "react";
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
  /*** Simple object like {i: '0', x: 0, y: 0, w: 1, h: 1} is all data
       that needed for one panel representation
  ***/
  @observable layouts = {
    lg: [
      {i: '0', x: 0, y: 0, w: 6, h: 1},
      {i: '1', x: 3, y: 0, w: 1, h: 1},
      {i: '2', x: 3, y: 0, w: 1, h: 2},
      {i: '3', x: 4, y: 2, w: 2, h: 1}
    ]
  };
  @observable layoutsData = {};
  @observable compactType = COMPACT_TYPE_OPTIONS[0];

  getPanels = () => {
    const panels = this.layouts.lg.map((layout, j, layouts) => {
      const panelsCount = layouts.length;
      const layoutText = this.layoutsData[layout.i] || '';
      const lastLayout = layouts[layouts.length-1];
      const lastLayoutIndex = lastLayout.i;

      return (
        <div
          key={layout.i}
          className={classNames('panel', { static: layout && layout.static})}>
          <Panel
            panelsCount={panelsCount}
            onAddPanelBottom={(e) => this.onAddPanelBottom(lastLayoutIndex, layout, e)}
            onAddPanelRight={(e) => this.onAddPanelRight(lastLayoutIndex, layout, e)}
            onRemovePanel={(e) => this.onRemovePanel(layout.i, e)}
            onLockPanel={(e) => this.onLockPanel(layout.i, e)}
            onSaveText={(e) => this.onSaveText(e, layout.i)}
            panelText={layoutText} />
        </div>
      )
    })

    return panels;
  }

  onLayoutChange = (layout, layouts) => {
    this.layouts = layouts;
  }

  onAddPanelBottom = (lastLayoutIndex, layout) =>  {
    // Calculate "i" index for new panel
    const lastItemId = lastLayoutIndex + 1;
    // Calculate Y position for new panel(x stat the same)
    const newLayoutYPosition = layout.y + layout.h;

    const newLayouts = toJS(this.layouts.lg);
    newLayouts.push({
      i: lastItemId.toString(),
      x: layout.x,
      y: newLayoutYPosition,
      w: 1,
      h: 1,
    });

    this.layouts = {
      lg: newLayouts
    }
  }

  onAddPanelRight = (lastLayoutIndex, layout) =>  {
      // Calculate "i" index for new panel
    const lastItemId = lastLayoutIndex + 1;
    // Calculate Y position for new panel(x stat the same)
    const newLayoutXPosition = layout.x + layout.w;

    const newLayouts = toJS(this.layouts.lg)
    newLayouts.push({
      i: lastItemId.toString(),
      x: newLayoutXPosition,
      y: layout.y,
      w: 1,
      h: 1,
    });

    this.layouts = {
      lg: newLayouts
    }
  }

  onRemovePanel = (index) =>  {
    const filteredLayouts = this.layouts.lg.filter(item => {
      return item.i != index;
    })

    this.layouts.lg = filteredLayouts;
  }

  onLockPanel = (index) => {
    const layoutsWithLock = toJS(this.layouts.lg).map(item => {
      if (item.i == index) {
        item.static = !item.static;
      }
      return item;
    })

    this.layouts = {
      lg: layoutsWithLock
    }
  }

  onSaveText = (e, index) => {
    const textValue = e.target.value;
    this.layoutsData[index] = textValue;
  }

  setCompactType = () => {
    let currentTypeIndex = COMPACT_TYPE_OPTIONS.indexOf(this.compactType);
    this.compactType = currentTypeIndex < (COMPACT_TYPE_OPTIONS.length-1) ?
      COMPACT_TYPE_OPTIONS[++currentTypeIndex] : COMPACT_TYPE_OPTIONS[0];
  }

  render() {
    return (
      <div>
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
          layouts={this.layouts}
          breakpoints={{lg: 1200, sm: 768, xs: 480}}
          cols={{lg: 7, sm: 4, xs: 2}}
          margin={[18,18]}
          containerPadding={[30, 30]}
          measureBeforeMount={false}
          compactType={this.compactType || null}
          onLayoutChange={this.onLayoutChange}>
          {this.getPanels()}
        </ResponsiveGridLayout>
      </div>
    );
  }
}

PageTemplate.displayName = "PageTemplate"

PageTemplate.propTypes = {
  store: PropTypes.object,
}

export default PageTemplate;
