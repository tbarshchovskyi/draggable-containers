import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import PageTemplate from "./components/PageTemplate";
import PageTemplateStore from "./stores/PageTemplateStore";
import './styles/style.scss';

const pageTemplateStore = new PageTemplateStore();

render(
  <div className="root-container">
    <PageTemplate store={pageTemplateStore} />
    <DevTools />
  </div>,
  document.getElementById("root")
);
