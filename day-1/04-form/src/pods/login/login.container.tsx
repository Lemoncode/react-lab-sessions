import * as React from "react";
import { LoginComponent } from "./login.component";
import { useHistory } from "react-router-dom";
import { routesLinks } from "core";
import { createEmptyLogin, LoginEntityVm } from "./login.vm";

export const LoginContainer = () => {
  const history = useHistory();
  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());

  const doLogin = (loginInfo: LoginEntityVm) => {
    console.log(loginInfo);
    history.push(routesLinks.hotelCollection);
  };

  return <LoginComponent onLogin={doLogin} initialLoginInfo={initialLogin} />;
};
