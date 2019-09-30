# 06 Global Data

In this example we are going to learn how to share global data using context.

We will take a startup point sample _/day-1/05-validation_.

Summary steps:

- Create a layout that will hold an app bar.
- Use this layout on the _hotel-collection_ scene.
- Store as global data the login information.
- Display the user logged in the app bar.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

## Steps to build it

- Copy the content of the `/data-1/05-validation` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Now that we can pass the login page (user admin password test) we will navigate to standard application
  pages, we will define a layout that will display an appbar plus the name of the user logged in.

- Let's start by defining this layout (check out material's ui )

_./src/layout/app.layout.tsx_

```tsx
import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const AppLayout: React.FunctionComponent = props => (
  <div>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="Menu">
          <AccountCircle />
        </IconButton>
        <Typography variant="h6" color="inherit">
          User logged in
        </Typography>
      </Toolbar>
    </AppBar>
    {props.children}
  </div>
);
```

- Let's add it to the layout barrel

_./src/layout/index.ts_

```diff
export * from './centered.layout';
+ export * from './app.layout';
```

- Let's instantiate this layout in the _hotel-collection_ scene.

_./src/scenes/hotel-collection.page.tsx_

```diff
import * as React from "react"
import { Link } from "react-router-dom";
import {routesLinks} from 'core';
+ import { AppLayout } from "layout";

export const HotelCollectionPage = () =>
-    <>
+    <AppLayout>
      <h2>Hello from Hotel Collection Page</h2>
      <Link to={routesLinks.login}>Navigate to Login</Link>
+    </AppLayout>
-    </>
```

- Now we need to get the the user logged in from the login page and store in some global place
  se we can request it from any other page or layout.

- First of all we need a place that will hold session data, let's create the context:

_./src/core/sessionContext.tsx_

```typescript
import * as React from "react";

export interface SessionContextProps {
  login: string;
  updateLogin: (value: string) => void;
}

export const createDefaultUser = (): SessionContextProps => ({
  login: "no user",
  updateLogin: value => {
    console.warn(
      "if you are reading this, likely you forgot to add the provider on top of your app"
    );
  }
});

export const SessionContext = React.createContext<SessionContextProps>(
  createDefaultUser()
);
```

- This session context will expose a provider (it will serve us to set the login name in the context), and a consumer (that will let us consume the login name from the context at any point of the application). We will create a component (we will name it SessionProvider) that on one hand will store in the state the login name and bind it to the SessionContext and on the other hand it will act as a wrapper (usually it will sit on top of the application and wrap the application).

Append this to the bottom of the file.

_./src/core/sessionContext.tsx_

```typescript
export const SessionProvider: React.StatelessComponent = props => {
  const [login, setLogin] = React.useState<string>("");

  return (
    <SessionContext.Provider value={{ login, updateLogin: setLogin }}>
      {props.children}
    </SessionContext.Provider>
  );
};
```

- Let's import the SessionProvider in the barrel index.

_./src/core/index.ts_

```diff
export * from './routes';
+ export * from './sessionContext';
```

- Let's setup the sessionProvider at the top of our application.

_./src/index.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HotelCollectionPage } from './scenes';
import {routerSwitchRoutes} from 'core';
- import {routerSwitchRoutes} from 'core';
+ import {routerSwitchRoutes, SessionProvider} from 'core';


ReactDOM.render(
+  <SessionProvider>
   <HashRouter>
     <Switch>
       <Route exact={true} path={routerSwitchRoutes.login} component={LoginPage} />
       <Route path={routerSwitchRoutes.hotelCollection} component={HotelCollectionPage} />
     </Switch>
   </HashRouter>
+  </SessionProvider>
   ,
  document.getElementById('root')
);
```

- Let's access the context in our app layout using the useContext.

_./src/layout/app.layout.tsx_

```diff
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
+ import { SessionContext } from 'core';

- export const AppLayout : React.FunctionComponent = (props) => (
+ export const AppLayout : React.FunctionComponent = (props) => {
+   const loginContext = React.useContext(SessionContext);
+ return (
  <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" color="inherit">
+            {loginContext.login}
-            User logged in
          </Typography>
        </Toolbar>
      </AppBar>
    {props.children}
  </div>
+   )
+ }
);
```

- Now we need to get the dat from the login page and store it in the context.

_./src/pods/login/login.container.tsx_

```diff
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoginComponent } from "./login.component";
- import { routesLinks } from "core";
+ import { routesLinks, SessionContext } from "core";
import {
  LoginEntity,
  createEmptyLogin,
  LoginFormErrors,
  createDefaultLoginFormErrors
} from "./login.vm";
import { validateCredentials } from "./api";
import { loginFormValidation } from "./login.validation";
```

```diff
export const LoginContainerInner = (props: Props) => {
+   const loginContext = React.useContext(SessionContext);
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
+            if(areValidCredentials) {
+               loginContext.updateLogin(credentials.login);
+                history.push(routesLinks.hotelCollection);
+            } else {
+                alert(
+                  "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.");
+            }
-            areValidCredentials
-              ? history.push(routesLinks.hotelCollection)
-              : alert(
-                  "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert."
-                );
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
```

# Excercises

- Implement a footer on the master layout.
