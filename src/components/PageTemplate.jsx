import React, { Component } from "react";
import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";
import { Responsive, WidthProvider } from 'react-grid-layout';
import classNames from 'classnames';

import Panel from "./Panel";


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
  }

  getPanels = () => {
    const panels = this.layouts.lg.map((layout, j, arr) => {
      const arrLength = arr.length

      return (
        <div
          key={layout.i}
          className={classNames('panel', { static: layout && layout.static })}>
          <Panel
            onAddPanel={(e) => this.onAddPanel(arrLength, e)}
            onRemovePanel={(e) => this.onRemovePanel(layout.i, e)}
            onLockPanel={(e) => this.onLockPanel(layout.i, e)} />
        </div>
      )
    })

    return panels
  }

  onLayoutChange = (layout, layouts) => {
    console.log('onLayoutChange')
    this.layouts = layouts
  }

  onAddPanel = (arrLength) =>  {
    const lastItemId = arrLength++

    this.layouts.lg.push({
      i: lastItemId.toString(),
      x: (this.layouts.lg.length) % 7,
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    })
    console.log('this.layouts.lg',toJS(this.layouts.lg))
  }

  onRemovePanel = (index) =>  {
    const filteredLayouts = toJS(this.layouts.lg).filter(item => {
      return item.i != index
    })

    this.layouts.lg = filteredLayouts
  }

  onLockPanel = (index) => {
    const layoutsWithLock = toJS(this.layouts.lg).map(item => {
      if (item.i == index) {
        item.static = item.static ? false : true
      }
      return item
    })

    this.layouts = {
      lg: layoutsWithLock
    }
  }

  render() {
    return (
      <div>
        <h2>Page template</h2>
        <ResponsiveGridLayout
          className="layout"
          currentBreakpoint="lg"
          layouts={this.layouts}
          breakpoints={{lg: 1200, sm: 768, xs: 480}}
          cols={{lg: 7, sm: 4, xs: 2}}
          containerPadding={[30, 30]}
          measureBeforeMount={false}
          onLayoutChange={this.onLayoutChange}>
          {this.getPanels()}
        </ResponsiveGridLayout>
      </div>
    );
  }
}

export default PageTemplate;
