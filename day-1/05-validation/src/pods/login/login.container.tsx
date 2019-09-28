import * as React from "react";
import { LoginComponent } from "./login.component";
import { useHistory } from "react-router-dom";
import { routesLinks } from "core";
import { createEmptyLogin, LoginEntityVm } from "./login.vm";
import { validateCredentials } from "./login.api";

export const LoginContainer = () => {
  const history = useHistory();
  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());

  const doLogin = (loginInfo: LoginEntityVm) => {
    validateCredentials(loginInfo.login, loginInfo.password).then(
      areValidCredentials => {
        areValidCredentials
          ? history.push(routesLinks.hotelCollection)
          : alert(
              "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert."
            );
      }
    );
  };

  return <LoginComponent onLogin={doLogin} initialLoginInfo={initialLogin} />;
};
