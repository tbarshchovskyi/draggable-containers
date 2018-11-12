import { observable, action, toJS } from "mobx";


export default class PageTemplateStore {
  /*** Simple object like {i: '0', x: 0, y: 0, w: 1, h: 1} is all data
       that needed for one panel representation
  ***/
  @observable layouts = {
    lg: [
      {i: '0', x: 0, y: 0, w: 7, h: 1}
    ]
  };
  @observable layoutsData = {};

  @action
  addPanelBottom = (lastLayoutIndex, layout) => {
    // Calculate "i" index for new panel
    const lastItemId = lastLayoutIndex + 1;
    // Calculate Y position for new panel(X stay the same)
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

  @action
  addPanelRight = (lastLayoutIndex, layout) => {
    // Calculate "i" index for new panel
    const lastItemId = lastLayoutIndex + 1;
    // Calculate X position for new panel(Y stay the same)
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

  @action
  removePanel = (index) =>  {
    const filteredLayouts = this.layouts.lg.filter(item => {
      return item.i != index;
    })

    this.layouts.lg = filteredLayouts;
  }

  @action
  lockPanel = (index) => {
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

  @action
  saveText = (e, index) => {
    const textValue = e.target.value;
    this.layoutsData[index] = textValue;
  }
}
