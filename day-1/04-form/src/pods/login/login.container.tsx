import * as React from "react";
import { LoginComponent } from "./login.component";
import { useHistory } from "react-router-dom";
import { routesLinks } from "core";

export const LoginContainer = () => {
  const history = useHistory();

  const doLogin = () => {
    history.push(routesLinks.hotelCollection);
  };

  return <LoginComponent onLogin={doLogin} />;
};
