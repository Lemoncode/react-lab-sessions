import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HotelCollectionPage } from './scenes';


ReactDOM.render(
   <HashRouter>
     <Switch>
       <Route exact={true} path='/' component={LoginPage} />
       <Route path="/hotel-collection" component={HotelCollectionPage} />
     </Switch>
   </HashRouter>,  
  document.getElementById('root')
);
