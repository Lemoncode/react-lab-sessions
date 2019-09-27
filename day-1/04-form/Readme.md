# 04 Form

In this example we are going to implement the basic login functionallity,
accesing a mock service to validation user and password, the only thing
we are not going to implement is form validation.

We will take a startup point sample _03-layout_.

Summary steps:

- Link the navigation to the login button.
- Create a viewmodel entity that will store login information.
- Get the data from the textFields.
- Create an api model that will hold credentials.
- Create a service that will simulate an async user password validation.
- Validate login and navigate to hotels list if validation passes.
- Excercises: add a notification component.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v8.x.x and npm 5.x.x by running `node -v` and `npm -v`
> in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content of the `03-layout` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Let's start by directly allowing the user to navigate to the hotel collection list when he clicks on
  the login button.

We need to navigate by code (javascript):

- This is a candidate to be placed on the container component.
- We need to teach how to navigate to the container component, we will use
  new react-router 5.1 hooks to navigate.

> If you are using a legacy version you can do it by using an hoc provided by react router, more about Hoc: https://reactjs.org/docs/higher-order-components.html

- Let's start by importing _useHistory_ hook and
  navigate and add a hanlder in the container to navigate to the login button.

_./src/pods/login.container.tsx_

```diff
import * as React from "react";
import { LoginComponent } from "./login.component";
+ import { useHistory } from "react-router-dom";
+ import { routesLinks } from "core";

export const LoginContainer = () => {
+  const history = useHistory();

+  const doLogin = () => {
+     history.push(routesLinks.hotelCollection);
+  }

-  return <LoginComponent />;
+ return <LoginComponent onLogin={doLogin}/>
};
```

- Now we have to define _onLogin_ property on the _login.component_

_./src/pods/login/login.component.tsx_

```diff
interface Props extends WithStyles<typeof styles> {
+ onLogin : () => void;
}
```

_./src/pods/login/login.component.tsx_

```diff
export const LoginComponentInner = (props: Props) => {
-  const { classes } = props;
+  const { onLogin } = props;

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <div className={classes.formContainer}>
            <TextField label="Name" margin="normal" />
            <TextField label="Password" type="password" margin="normal" />
-            <Button variant="contained" color="primary">
+            <Button variant="contained" color="primary" onClick={onLogin}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
```

- Let's run the project

```
npm start
```

- Now we need to collect the data that the user is entering in the name and password textfields, now it's
  time to really understand how one way data flow works:

  - We cannot just grab the value from the text field.
  - We have to bind a value.
  - We have to listen for any change, send the update via callback and from the container component
    set the value so it will flow down an update the textField.
  - We want to control the state of the form (fields dirty, is valid, etc...), to 
  do that we will make use of two libraries:
     - React Final Form: control form state.
     - Fonk: Form validation libray.

- We will start by creating a viewModel:

_./src/pods/login.vm.ts_

```typescript
export interface LoginEntityVm {
  login: string;
  password: string;
}

export const createEmptyLogin = (): LoginEntityVm => ({
  login: "",
  password: ""
});
```

- We will store current login information in the container state.

_./src/pods/login/login.container.tsx_

```diff
+ import {LoginEntityVm, createEmptyLogin} from './login.vm'
// ...

export const LoginContainerInner = (props : Props) => {

+ const [credentials, setCredentials] = React.useState<LoginEntityVm>(createEmptyLogin());

  const {history} = props;

  const doLogin = () => {
    history.push(routesLinks.hotelCollection);
  }

  return <LoginComponent onLogin={doLogin}/>
};
```

- We need to pass down credentials to the login component:

_./src/pods/login/login.container.tsx_

```diff
return <LoginComponent
          onLogin={doLogin}
+          credentials={credentials}
        />
```

- And we need to received updates from the login component to store them in the
  credentials state.

_./src/pods/login/login.container.tsx_

```diff
export const LoginContainerInner = (props : Props) => {
  const [credentials, setCredentials] = React.useState<LoginEntityVm>(createEmptyLogin());
  const {history} = props;

  const doLogin = () => {
    history.push(routesLinks.hotelCollection);
  }

+ const onUpdateCredentialsField = (name, value) => {
+   setCredentials({
+     ...credentials,
+     [name]: value,
+   });
+ }

  return <LoginComponent
              onLogin={doLogin}
              credentials={credentials}
+             onUpdateCredentials={onUpdateCredentialsField}
              />
};

```

- Let's setup this as props on the login component and use destructuring to avoid
  having to add props prefix to every call.

_./src/pods/login/login.component.tsx_

```diff
+ import {LoginEntityVm} from './login.vm'

// (...)

interface Props extends WithStyles<typeof styles> {
  onLogin : () => void;
+ credentials : LoginEntityVm;
+ onUpdateCredentials : (name : keyof LoginEntityVm, value : string) => void;
}

export const LoginComponentInner = (props: Props) => {
-   const { classes, onLogin } = props;
+ const { classes, onLogin, credentials, onUpdateCredentials} = props;
```

- Now on one hand we need to bind the credentials values to each _TextField_ and
  subscribe to the _TextField_ on change event to detect changes an update the state.

_./src/pods/login/login.component.tsx_

```diff
  <TextField
    label="Name"
    margin="normal"
+   value={credentials.login}
  />
  <TextField
    label="Password"
    type="password"
    margin="normal"
+   value={credentials.password}
  />
```

- Let's hook to updates, here we have a challenge:

  - TextField expects an event targe value.
  - Our Update field expects name and value.

  We will add a helper method and make use of curry to inform the field name (there are
  other tricks like adding a name to the component and pass there the Id of the field).

_./src/pods/login/login.component.tsx_

```diff
  export const LoginComponentInner = (props: Props) => {
  const { classes, onLogin, LoginEntityVm, onUpdateCredentials} = props;

+  const onTexFieldChange = (fieldId : keyof LoginVm) => (e) => {
+    onUpdateCredentials(fieldId, e.target.value);
+  }

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <div className={classes.formContainer}>
            <TextField
              label="Name"
              margin="normal"
              value={credentials.login}
+             onChange={onTexFieldChange('login')}
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              value={credentials.password}
+            onChange={onTexFieldChange('password')}
            />
            <Button variant="contained" color="primary" onClick={onLogin}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
```

- Just to make a quick check and ensure we are on the right track let's add a console.log
  in our container, just when the user hits the login button and print out the credentials.

_./src/pods/login/login.container.tsx_

```diff
  const doLogin = () => {
+    console.log(credentials);
    history.push(routesLinks.hotelCollection);
  }
```

- Le'ts give a try:

```bash
npm start
```

- Now it's time validate that the credentials are valid, to do that we will create a fake validation
  service and we will simulate that we are making a request to a server (using setTimeout).

_./src/pods/login/api.ts_

```typescript
// This is just test code, never hard code user and password in JS this should call a real service
export const validateCredentials = (
  user: string,
  password: string
): Promise<boolean> =>
  new Promise<boolean>(resolve =>
    setTimeout(() => resolve(user === "admin" && password === "test"), 500)
  );
```

- Let's call this api service in our _login.containter.tsx_

_./src/pods/login/login.container.tsx_

```diff
+ import {validateCredentials} from './api';

  const doLogin = () => {
-    console.log(credentials);
+   validateCredentials(credentials.login, credentials.password).then((areValidCredentials) => {
+       (areValidCredentials) ?
+           history.push(routesLinks.hotelCollection)
+       :
+      alert('invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.')
+       ;
+ });
  }
```

// pending api service + promise + timeout
// validate password (admin / test)
// Excercises, toast not valid user password

# Excercises

##Excercise 1

LoginComponent can be componentized, final result should look like:

```tsx
export const LoginComponentInner = (props: Props) => {
  const { classes, onLogin } = props;

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <LoginForm onLogin={onLogin} />
        </CardContent>
      </Card>
    </>
  );
};
```

## Excercise 2

Replace current alert with a Material ui snackbar:

- Sample: https://material-ui.com/demos/snackbars/

- Wrap it into a notification control under components.
