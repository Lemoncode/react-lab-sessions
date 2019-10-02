import * as React from "react";
import { LoginComponent } from "./login.component";
import { useHistory } from "react-router-dom";
import { routesLinks, SessionContext } from "core";
import { createEmptyLogin, LoginEntityVm } from "./login.vm";
import { validateCredentials } from "./login.api";

export const LoginContainer = () => {
  const loginContext = React.useContext(SessionContext);
  const history = useHistory();
  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());

  const navigateToHotel = (loginInfo: LoginEntityVm) => {
    loginContext.updateLogin(loginInfo.login);
    history.push(routesLinks.hotelCollection);
  };

  const doLogin = (loginInfo: LoginEntityVm) => {
    validateCredentials(loginInfo.login, loginInfo.password).then(
      areValidCredentials => {
        areValidCredentials
          ? 
          navigateToHotel(loginInfo)
          : alert(
              "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert."
            );
      }
    );
  };

  return <LoginComponent onLogin={doLogin} initialLoginInfo={initialLogin} />;
};
