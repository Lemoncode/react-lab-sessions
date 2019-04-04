import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoginComponent } from "./login.component";
import { routesLinks } from "core";
import { LoginEntity, createEmptyLogin } from "./login.vm";

interface Props extends RouteComponentProps {};

export const LoginContainerInner = (props : Props) => {  
  const [credentials, setCredentials] = React.useState<LoginEntity>(createEmptyLogin());
  const {history} = props;

  const doLogin = () => {
    console.log(credentials);
    history.push(routesLinks.hotelCollection);
  }

   const onUpdateCredentialsField = (name, value) => {
       setCredentials({
         ...credentials,
         [name]: value,
       });
     }
    

  return <LoginComponent 
              onLogin={doLogin}
              credentials={credentials}
              onUpdateCredentials={onUpdateCredentialsField}              
          />
};

export const LoginContainer = withRouter<Props>(LoginContainerInner);
