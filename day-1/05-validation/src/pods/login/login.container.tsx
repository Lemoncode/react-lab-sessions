import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginComponent } from './login.component';
import { linkRoutes } from 'core';
import { LoginEntityVm, createEmptyLogin } from './login.vm';
import { validateCredentials } from './login.api';

export const LoginContainer = () => {
  const history = useHistory();
  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());

  const handleLogin = (loginInfo: LoginEntityVm) => {
    validateCredentials(loginInfo.login, loginInfo.password).then(
      areValidCredentials => {
        areValidCredentials
          ? history.push(linkRoutes.hotelCollection)
          : alert(
              'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
            );
      }
    );
  };

  return <LoginComponent onLogin={handleLogin} initialLogin={initialLogin} />;
};
