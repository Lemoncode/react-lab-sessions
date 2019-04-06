import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoginComponent } from "./login.component";
import { routesLinks, SessionContext } from "core";
import {
  LoginEntity,
  createEmptyLogin,
  LoginFormErrors,
  createDefaultLoginFormErrors
} from "./login.vm";
import { validateCredentials } from "./api";
import { loginFormValidation } from "./login.validation";

interface Props extends RouteComponentProps {}

export const LoginContainerInner = (props: Props) => {
  const loginContext = React.useContext(SessionContext);  
  const [loginFormErrors, setLoginFormErrors] = React.useState<LoginFormErrors>(
    createDefaultLoginFormErrors()
  );

  const [credentials, setCredentials] = React.useState<LoginEntity>(
    createEmptyLogin()
  );
  const { history } = props;

  // TODO: Excercise refactor this method follow SRP
  const doLogin = () => {
    loginFormValidation.validateForm(credentials).then(formValidationResult => {
      if (formValidationResult.succeeded) {
        validateCredentials(credentials.login, credentials.password).then(
          areValidCredentials => {
            if(areValidCredentials) {
                  loginContext.updateLogin(credentials.login);
                  history.push(routesLinks.hotelCollection);
              } else {
                  alert(
                    "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert."
                    );
              }  
          }            
        );
      } else {
        alert("error, review the fields");
        const updatedLoginFormErrors = {
          ...loginFormErrors,
          ...formValidationResult.fieldErrors
        };
        setLoginFormErrors(updatedLoginFormErrors);
      }
    });
  };

  const onUpdateCredentialsField = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    });

    loginFormValidation
      .validateField(credentials, name, value)
      .then(fieldValidationResult => {
        setLoginFormErrors({
          ...loginFormErrors,
          [name]: fieldValidationResult
        });
      });
  };

  return (
    <LoginComponent
      onLogin={doLogin}
      credentials={credentials}
      onUpdateCredentials={onUpdateCredentialsField}
      loginFormErrors={loginFormErrors}
    />
  );
};

export const LoginContainer = withRouter<Props>(LoginContainerInner);
