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

_./src/layouts/app.layout.tsx_

```tsx
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const AppLayout: React.FunctionComponent = props => {
  const { children } = props;
  return (
    <>
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
      {children}
    </>
  );
};

```

- Let's add it to the layout barrel

_./src/layouts/index.ts_

```diff
export * from './centered.layout';
+ export * from './app.layout';
```

- Let's instantiate this layout in the _hotel-collection_ scene.

_./src/scenes/hotel-collection.scene.tsx_

```diff
import * as React from 'react';
import { Link } from 'react-router-dom';
import { linkRoutes } from 'core';
+ import { AppLayout } from 'layouts';

export const HotelCollectionScene = () => (
- <>
+ <AppLayout>
    <h2>Hello from Hotel Collection Scene</h2>
    <Link to={linkRoutes.login}>Navigate to Login</Link>
- </>
+ </AppLayout>
);

```

- Now we need to get the the user logged in from the login page and store in some global place
  se we can request it from any other page or layout.

- First of all we need a place that will hold session data, let's create the context:

_./src/core/session-context.tsx_

```typescript
import * as React from 'react';

interface Context {
  login: string;
  updateLogin: (value: string) => void;
}

export const SessionContext = React.createContext<Context>({
  login: 'no user',
  updateLogin: value => {
    console.warn(
      'if you are reading this, likely you forgot to add the provider on top of your app'
    );
  },
});

```

- This session context will expose a provider (it will serve us to set the login name in the context), and a consumer (that will let us consume the login name from the context at any point of the application). We will create a component (we will name it SessionProvider) that on one hand will store in the state the login name and bind it to the SessionContext and on the other hand it will act as a wrapper (usually it will sit on top of the application and wrap the application).

Append this to the bottom of the file.

_./src/core/sessionContext.tsx_

```typescript
// (...)

export const SessionProvider: React.FunctionComponent = props => {
  const [login, setLogin] = React.useState('');

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
+ export * from './session-context';
```

- Let's setup the sessionProvider at the top of our application.

_./src/index.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginScene, HotelCollectionScene } from './scenes';
- import { switchRoutes } from 'core';
+ import { switchRoutes, SessionProvider } from 'core';

ReactDOM.render(
+ <SessionProvider>
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path={[switchRoutes.root, switchRoutes.login]}
          component={LoginScene}
        />
        <Route
          path={switchRoutes.hotelCollection}
          component={HotelCollectionScene}
        />
      </Switch>
-   </HashRouter>,
+   </HashRouter>
+ </SessionProvider>,
  document.getElementById('root')
);

```

- Let's access the context in our app layout using the useContext.

_./src/layouts/app.layout.tsx_

```diff
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
+ import { SessionContext } from 'core';

export const AppLayout: React.FunctionComponent = props => {
  const { children } = props;
+ const { login } = React.useContext(SessionContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" color="inherit">
-           User logged in
+           {login}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

```

- Now we need to get the dat from the login page and store it in the context.

_./src/pods/login/login.container.tsx_

```diff
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginComponent } from './login.component';
- import { linkRoutes } from 'core';
+ import { linkRoutes, SessionContext } from 'core';
import { LoginEntityVm, createEmptyLogin } from './login.vm';
import { validateCredentials } from './login.api';

export const LoginContainer = () => {
  const history = useHistory();
  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());
+ const { updateLogin } = React.useContext(SessionContext);

+ const navigateToHotel = (loginInfo: LoginEntityVm) => {
+   updateLogin(loginInfo.login);
+   history.push(linkRoutes.hotelCollection);
+ };

  const handleLogin = (loginInfo: LoginEntityVm) => {
    validateCredentials(loginInfo.login, loginInfo.password).then(
      areValidCredentials => {
        areValidCredentials
-         ? history.push(linkRoutes.hotelCollection)
+         ? navigateToHotel(loginInfo)
          : alert(
              'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
            );
      }
    );
  };

  return <LoginComponent onLogin={handleLogin} initialLogin={initialLogin} />;
};

```

# Excercises

- Implement a footer on the master layout.
