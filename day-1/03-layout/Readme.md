# 03 Layout

In this sample we are going to learn how to setup material ui, build a modern layout,
and componentize our components.

We will take a startup point sample _02-routing_.

Summary steps:

- Install material ui.
- Discuss if it's a good idea to build the layout directly on the loging scene (SRP).
- Create a pod that will hold the login functionallity, explain what's a pod.
- Discuss the differente between a container an a component.
- Expose the component in a barrel.
- Make us of this component in the _login scene_.
- Create a login component.
- Start building the layout.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v8.x.x and npm 5.x.x by running `node -v` and `npm -v`
> in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content of the `02-routing setup` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Let' start by installing material ui (as great react material design implementation, that contains a full set of components and is highly customizable).

```bash
npm install @material-ui/core @material-ui/icons --save
```

- We could start create the login layout directly under the login scene
  _./src/scenes/login.scene.tsx_ but is this a good idea? probably not:

  - The login scene alreadys does has a well defined mission: choose the layout and
    display one or more rich components.

  - If in the future we want to reuse the login component it would be hard to extract it
    from the login scene (we would have to copy paste content).

  Why not isolate this login functionallity as a separate concern? That's it, let's talk about pods:

  - We can isolate rich functionallity and enclose it in a pod (is a good idea to follow DDD
    principles to isolate this functionallity).
  - A pods will be self contained, it will contain all that is needed to run (containers,
    components, client api's, model...).
  - If the pod needs to interact with the main application (e.g. read data from a global state),
    we can choose whether:

    - Be purist and use an event emitter to request or receive updates.
    - Use any global state react management goodie like context or redux.

* In our case we will focused first on login layout, we will create a login pod
  (we will add functionallity to the login pod in the follwing exmaple).

* That's great we know now that we are going to use pods, let's start building the component,
  when building components in React we have to diferentiate between containers and presentational
  components:

  - A container component will have state, and will execute actions like accessing a rest api.
  - A presentational component will just take care of rendering some HTML into the DOM.

  It can happen that in some cases we could have a mix of both, but usually not.

  In our case:

  - We are going to create a _login.container.tsx_ that right now will be almost
    empty (only instantiating the login presentational component that we are going to build).

  - Then we are going to create a _login.component.tsx_, in this example we are going to focus working here, first we will create a first version of the layout the we will start componentizing.

- Let's create our login presentational component:

_./src/pods/login/login.component.tsx_

```tsx
import * as React from 'react';

export const LoginComponent = () => {
  return (
    <>
      <h1>Hello from login pod, login component</h1>
    </>
  );
};

```

- Now a container:

_./src/pods/login/login.container.tsx_

```tsx
import * as React from 'react';
import { LoginComponent } from './login.component';

export const LoginContainer = () => {
  return <LoginComponent />;
};

```

- Let's create a barrel and expose login container so it ca ben consumed by the outer world.

_./src/pods/login/index.ts_

```typescript
export * from './login.container';

```

- Now we need to add our root _pods_ folder as an alias.

_webpack.config.js_

```diff
    alias: {
      // Later on we will add more aliases here
      layout: path.resolve(__dirname, "./src/layout/"),
      scenes: path.resolve(__dirname, "./src/scenes/"),
      core: path.resolve(__dirname, './src/core/'),
+     pods: path.resolve(__dirname, './src/pods/'),
    }
```

_tsconfig.json_

```diff
    "paths": {
      "layout": ["./layout/"],
      "scenes": ["./scenes/"],
      "core": ["./core/"],
+     "pods": ["./pods/"]
    }
```

- Let's use this pod in our login scene.

_./src/scenes/login.scene.tsx_

```diff
import * as React from 'react';
- import { Link } from 'react-router-dom';
import { CenteredLayout } from 'layouts';
- import { linkRoutes } from 'core';
+ import { LoginContainer } from 'pods/login';

export const LoginScene = () => (
  <CenteredLayout>
-   <h2>Hello from login Scene</h2>
-   <Link to={linkRoutes.hotelCollection}>Navigate to Hotel Collection</Link>
+   <LoginContainer />
  </CenteredLayout>
);

```

- Let's check that we haven't broken anything

```bash
npm start
```

- Now it's time to start building our layout: we are going to make use of cards,
  textfield and buttons (you can check how the work on the react material ui official
  page: https://material-ui.com/), and we will use HTML standard flexbox to place
  the components.

Let's start by creating a login card (we will import as well the widgets we need to
use to build the whole form)

_./src/pods/login/login.component.tsx_

```diff
import * as React from "react";
+ import Card from "@material-ui/core/Card";
+ import CardHeader from "@material-ui/core/CardHeader";
+ import CardContent from "@material-ui/core/CardContent";
+ import TextField from "@material-ui/core/TextField";
+ import Button from "@material-ui/core/Button";

export const LoginComponent = () => {
  return (
-   <>
-      <h1>Hello from login pod, login component</h1>
+      <Card>
+        <CardHeader title="Login" />
+        <CardContent>
+          Content here...
+        </CardContent>
+      </Card>
-   </>
  );
};
```

- Let's run the sample:

```bash
npm start
```

- Hey ! we got some results, the card is displayed, let's add now some content:

_./src/pods/login/login.component.tsx_

```diff
    <Card>
      <CardHeader title="Login" />
      <CardContent>
-      Content here...
+      <div>
+        <TextField label="Name" margin="normal" />
+        <TextField label="Password" type="password" margin="normal" />
+        <Button variant="contained" color="primary">
+          Login
+        </Button>
+      </div>
      </CardContent>
    </Card>
```

- Nice we got the controls but layout is looking a bit weird we want the forms
  to flow top to bottom. Let's add some styling, we will make use of flexbox to
  do this and we will make use of CSS in JS (we will setup list of properties,
  extend from a given helper to get properties types and a high order component
  to inject the CSS in our component)

```diff
import * as React from 'react';
+ import { makeStyles } from '@material-ui/core/styles';
...

+ const useStyles = makeStyles({
+  formContainer: {
+    display: "flex",
+    flexDirection: "column",
+    justifyContent: "center"
+  }
+ });

+ interface Props {}

- export const LoginComponent = () => {
+ export const LoginComponent: React.FunctionComponent = props => {
+ const { classes } = useStyles(props);

  return (
    <Card>
      <CardHeader title="Login" />
      <CardContent>
-       <div>
+       <div className={classes.formContainer}>
          <TextField label="Name" margin="normal" />
          <TextField label="Password" type="password" margin="normal" />
          <Button variant="contained" color="primary">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
```

> Excercise the loginCard still look to cluttered, let's add a minWidth of 400px or
> a similar size using rem.
