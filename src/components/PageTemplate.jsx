import React, { Component } from "react";
import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";
import { Responsive, WidthProvider } from 'react-grid-layout';
import classNames from 'classnames';

import Panel from "./Panel";


const COMPACT_TYPE_OPTIONS = ['vertical', 'horizontal', '']
const ResponsiveGridLayout = WidthProvider(Responsive);

@observer
class PageTemplate extends React.Component {
  @observable layouts = {
    lg: [
      {i: '0', x: 0, y: 0, w: 7, h: 1},
      {i: '1', x: 3, y: 0, w: 1, h: 1},
      {i: '2', x: 3, y: 0, w: 1, h: 2},
      {i: '3', x: 4, y: 2, w: 2, h: 1}
    ]
  };
  @observable layoutsData = {'1': 'Some interesting draggable panel!'};
  @observable compactType = COMPACT_TYPE_OPTIONS[0];

  getPanels = () => {
    const panels = this.layouts.lg.map((layout, j, arr) => {
      const panelsCount = arr.length
      const layoutText = this.layoutsData[layout.i] || ''

      return (
        <div
          key={layout.i}
          className={classNames('panel', { static: layout && layout.static})}>
          <Panel
            panelsCount={panelsCount}
            onAddPanel={(e) => this.onAddPanel(panelsCount, e)}
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

  onAddPanel = (arrLength) =>  {
    const lastItemId = arrLength++;

    this.layouts.lg.push({
      i: lastItemId.toString(),
      x: (this.layouts.lg.length) % 7,
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2,
      text: ''
    })
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
        item.static = item.static ? false : true;
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
    console.log('this.compactType',this.compactType)
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

export default PageTemplate;
