import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { LoginPage, HotelCollectionPage } from "./scenes";
import { routerSwitchRoutes } from "core";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route
        exact={true}
        path={routerSwitchRoutes.login}
        component={LoginPage}
      />
      <Route
        path={routerSwitchRoutes.hotelCollection}
        component={HotelCollectionPage}
      />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
