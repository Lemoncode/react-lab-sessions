import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginComponent } from './login.component';
import { linkRoutes, SessionContext } from 'core';
import { LoginEntityVm, createEmptyLogin } from './login.vm';
import { validateCredentials } from './login.api';

export const LoginContainer = () => {
  const history = useHistory();
  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());
  const { updateLogin } = React.useContext(SessionContext);

  const navigateToHotel = (loginInfo: LoginEntityVm) => {
    updateLogin(loginInfo.login);
    history.push(linkRoutes.hotelCollection);
  };

  const handleLogin = (loginInfo: LoginEntityVm) => {
    validateCredentials(loginInfo.login, loginInfo.password).then(
      areValidCredentials => {
        areValidCredentials
          ? navigateToHotel(loginInfo)
          : alert(
              'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
            );
      }
    );
  };

  return <LoginComponent onLogin={handleLogin} initialLogin={initialLogin} />;
};
