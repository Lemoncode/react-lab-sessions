# 04 Form

In this example we are going to implement the basic login functionallity,
accesing a mock service to validation user and password, the only thing
we are not going to implement is form validation.

We will take a startup point sample _03-layout_.

Summary steps:

- Link the navigation to the login button.
- Create a viewmodel entity that will store login information.
- Get the data from the textFields.
- Crete an api model that will hold credentials.
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
  - We need to teach how to navigate to the container component, we will do that
  by using an hoc provided by react router, more about Hoc: https://reactjs.org/docs/higher-order-components.html

- Let's start by getting our navigation typed on props:

```diff
+ import { withRouter, RouteComponentProps } from "react-router-dom";

+ interface Props extends RouteComponentProps {};

- export const LoginContainer = () => {
+ export const LoginContainer = (props : Props) => {  
  return <LoginComponent />
};
```

- Let's inject the navigation functionallity to our component:

```diff
- export const LoginContainer = (props : Props) => {  
+ export const LoginContainerInner = (props : Props) => {  
  return <LoginComponent />
};

+ export const LoginPageContainer = withRouter<Props>(LoginContainerInner);
```
- By doing this we get in our property a field called _history_ from that object
we have access to a method called _push_ that allows us to navigate to other pages.

- Let's define a method that will be passed down as props to the _LoginComponent_

```diff
import { LoginComponent } from "./login.component";
+ import { routesLinks } from "core";

interface Props extends RouteComponentProps {};

export const LoginContainerInner = (props : Props) => {  
  const {history} = props;

+  const doLogin = () => {
+    history.push(routesLinks.hotelCollection);
+  }

-   return <LoginComponent />
+   return <LoginComponent onLogin={doLogin}/>
};

+ export const LoginContainer = withRouter<Props>(LoginContainerInner);
```

- Now we have to define _onLogin_ property on the _login.component_

_./src/pods/login/login.component.tsx_

```diff
interface Props extends WithStyles<typeof styles> {
+ onLogin : () => void;  
}
```

_./src/pods/login/login.component.tsx_

````diff
export const LoginComponentInner = (props: Props) => {
-  const { classes } = props;
+  const { classes, onLogin } = props;

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
``


