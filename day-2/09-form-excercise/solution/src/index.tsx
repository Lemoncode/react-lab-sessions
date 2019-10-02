import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { LoginPage, HotelCollectionPage, HotelEditPage } from "./scenes";
import { routerSwitchRoutes, SessionProvider } from "core";

ReactDOM.render(
  <SessionProvider>
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
        <Route path={routerSwitchRoutes.hotelEdit} component={HotelEditPage} />
      </Switch>
    </HashRouter>
  </SessionProvider>,
  document.getElementById("root")
);
