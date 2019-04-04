import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoginComponent } from "./login.component";
import { routesLinks } from "core";

interface Props extends RouteComponentProps {};

export const LoginContainerInner = (props : Props) => {  
  const {history} = props;

  const doLogin = () => {
    history.push(routesLinks.hotelCollection);
  }

  return <LoginComponent onLogin={doLogin}/>
};

export const LoginContainer = withRouter<Props>(LoginContainerInner);
