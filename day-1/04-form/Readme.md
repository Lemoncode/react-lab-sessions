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

```diff
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

- We will start by creating a viewModel:

_./src/pods/login.vm.ts_

```typescript
export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLogin = (): LoginEntity => ({
  login: "",
  password: ""
});
```

- We will store current login information in the container state.

_./src/pods/login/login.container.tsx_

```diff
+ import {LoginEntity, createEmptyLogin} from './login.vm'
// ...

export const LoginContainerInner = (props : Props) => {  

+ const [credentials, setCredentials] = React.useState<LoginEntity>(createEmptyLogin());

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
  const [credentials, setCredentials] = React.useState<LoginEntity>(createEmptyLogin());
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
+ import {LoginEntity} from './login.vm'

// (...)

interface Props extends WithStyles<typeof styles> {
  onLogin : () => void; 
+ credentials : LoginEntity;
+ onUpdateCredentials : (name : keyof LoginEntity, value : string) => void;
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
  const { classes, onLogin, LoginEntity, onUpdateCredentials} = props;
  
+  const onTexFieldChange = (fieldId : keyof Credentials) => (e) => {
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
          <LoginForm 
            onLogin={onLogin}
          />
        </CardContent>
      </Card>
    </>
  );
};
```


