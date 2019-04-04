import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoginComponent } from "./login.component";
import { routesLinks } from "core";
import { LoginEntity, createEmptyLogin } from "./login.vm";
import { validateCredentials } from "./api";

interface Props extends RouteComponentProps {}

export const LoginContainerInner = (props: Props) => {
  const [credentials, setCredentials] = React.useState<LoginEntity>(
    createEmptyLogin()
  );
  const { history } = props;

  const doLogin = () => {
    validateCredentials(credentials.login, credentials.password).then(
      areValidCredentials => {
        areValidCredentials
          ? history.push(routesLinks.hotelCollection)
          : alert(
              "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert."
            );
      }
    );
  };

  const onUpdateCredentialsField = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  return (
    <LoginComponent
      onLogin={doLogin}
      credentials={credentials}
      onUpdateCredentials={onUpdateCredentialsField}
    />
  );
};

export const LoginContainer = withRouter<Props>(LoginContainerInner);
