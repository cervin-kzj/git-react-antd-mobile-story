import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { createBrowserHistory } from 'history';

import { Detail } from "./pages/Detail/Detail";
import List from "./pages/List/List";
import { Type } from "./pages/Type/Type";
import { Index } from "./pages/Index/Index";
import "./App.css";

const history = createBrowserHistory();
function App() {
  return (
    <div className="wrap">
      <Router>
        <CacheSwitch>
          <CacheRoute exact path="/storylist/:classifyId" component={List} when="always" cacheKey="ListComponent" history={history} />
          <Route exact path="/storydetail/:id" component={Detail} history={history} />
          <Route path="/storytype" component={Type} history={history} />
          <Route path="/index" component={Index} history={history} />
        </CacheSwitch>
      </Router>
    </div>
  );
}

export default App;
