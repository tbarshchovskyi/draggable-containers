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
      {i: '0', x: 2, y: 0, w: 5, h: 2}
    ]
  }

  getPanels = () => {
    const panels = this.layouts.lg.map((layout, i) => {
      const layoutObj = toJS(layout)
      return (
        <div
          key={i}
          className={classNames('panel', { static: layout && layout.static })}>
          <Panel
            onAddPanel={this.onAddPanel}
            onRemovePanel={(e) => this.onRemovePanel(i, e)} />
        </div>
      )
    })

    return panels
  }

  onLayoutChange = (layout, layouts) => {
    this.layouts = layouts
  }

  onAddPanel = () =>  {
    this.layouts.lg.push({
      i: "3",
      x: (this.layouts.lg.length) % 5,
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    })
}

onRemovePanel = (i) =>  {
  console.log('Layouts',i, toJS(this.layouts.lg))

  const filtersLayouts = toJS(this.layouts.lg).filter(item => {
    return item.i != i
  })
  console.log('filtersLayouts',i, filtersLayouts)
  this.layouts.lg = filtersLayouts
}

  render() {
    return (
      <div>
        <h2>Page template</h2>
        <ResponsiveGridLayout
          className="layout"
          currentBreakpoint="lg"
          layouts={this.layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 5, md: 4, sm: 3, xs: 3, xxs: 2}}
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
