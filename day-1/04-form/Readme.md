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

- Let's install react-final-form

```bash
npm install react-final-form --save
```

- Now we need to do some plumbing, in order to integrate material-ui with final form:

  - We could make use of a third partie library: https://github.com/Deadly0/final-form-material-ui,
    but then you take the risk of keeping it in sync with material-ui current version.
  - You can create your own wrapper and place it in _common/components_

_./common/components/forms/text-field.tsx_

```typescript
import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import TextFieldMui from "@material-ui/core/TextField";

export const TextField: React.SFC<FieldRenderProps<any, any>> = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextFieldMui
      {...rest}
      name={name}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value}
      helperText={showError ? meta.error.message : ""}
    />
  );
};
```

- And create the barrel

_./common/components/forms/index.tsx_

```typescript
export * from "./text-field";
```

- Now we need to add an alias in tsconfig and webpack config for the common root folder

_./tsconfig_

```diff
    "paths": {
      "layout": ["./layout/"],
      "scenes": ["./scenes/"],
+      "common": ["./common/"],
      "core": ["./core/"],
      "pods": ["./pods/"]
    }
```

_./webpack.config.js_

```diff
    alias: {
      // Later on we will add more aliases here
      layout: path.resolve(__dirname, "./src/layout/"),
      scenes: path.resolve(__dirname, "./src/scenes/"),
+      common: path.resolve(__dirname, "./src/common/"),
      core: path.resolve(__dirname, "./src/core/"),
      pods: path.resolve(__dirname, "./src/pods/")
    },
```

- Tiem to worry about the data, let's create a viewModel:

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

- We will store initial login information in the container state, and pass it
  down to the login component.

_./src/pods/login/login.container.tsx_

```diff
import * as React from "react";
import { LoginComponent } from "./login.component";
import { useHistory } from "react-router-dom";
import { routesLinks } from "core";
+ import { createEmptyLogin, LoginEntityVm } from "./login.vm";

export const LoginContainer = () => {
  const history = useHistory();
+  const [initialLogin] = React.useState<LoginEntityVm>(createEmptyLogin());

  const doLogin = (loginInfo: LoginEntityVm) => {
    console.log(loginInfo);
    history.push(routesLinks.hotelCollection);
  };

+  return <LoginComponent onLogin={doLogin} initialLoginInfo={initialLogin} />;
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
+ initialLoginInfo : LoginEntityVm;
}

export const LoginComponentInner = (props: Props) => {
-   const { classes, onLogin } = props;
+ const { classes, onLogin, initialLoginInfo} = props;
```

- Let's add react final form _FORM_ into the login Component

_./src/pods/login/login.component.tsx_

```diff
export const LoginComponent = (props: Props) => {
  const classes = useStyles(props);

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <div className={classes.formContainer}>
+         <Form
+            onSubmit={(values) => onLogin(values)}
+            initialValues={initialLoginInfo}
+            render={({ handleSubmit, submitting, pristine, values }) => (
              <TextField label="Name" margin="normal" />
              <TextField label="Password" type="password" margin="normal" />
-              <Button variant="contained" color="primary">
+              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
+              </form>
+            )}/>
        </div>
      </Card>
    </>
  );
};
```

- Let's point to the ReactFinalFrom wrapper TextFields and include binding
  information.

```diff
import CardContent from "@material-ui/core/CardContent";
- import TextField from "@material-ui/core/TextField";
+ import { TextField } from "common/components/forms";
```

```diff
-     <TextField label="Name" margin="normal" />
+      <Field
+        fullWidth
+        name="login"
+        component={TextField}
+        type="text"
+        label="Name"
+      />

-    <TextField label="Password" type="password" margin="normal" />
+      <Field
+        fullWidth
+        name="password"
+        component={TextField}
+        type="password"
+        label="Password"
+      />
```

- Let's add some debugging info:

```diff
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
+      <pre>{JSON.stringify(values, undefined, 2)}</pre>
+      <Field name="login">
+        {props => <pre>{JSON.stringify(props, undefined, 2)}</pre>}
+      </Field>
    </form>
```

- Now it's time validate that the credentials are valid, to do that we will create a fake validation
  service and we will simulate that we are making a request to a server (using setTimeout).

_./src/pods/login.api.ts_

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
