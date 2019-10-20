import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginScene, HotelCollectionScene } from './scenes';
import { switchRoutes } from 'core';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route
        exact={true}
        path={[switchRoutes.root, switchRoutes.login]}
        component={LoginScene}
      />
      <Route
        path={switchRoutes.hotelCollection}
        component={HotelCollectionScene}
      />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
