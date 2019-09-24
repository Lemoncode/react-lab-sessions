# 01 Setup Routing

In this sample weill start using React-Router (SPA Navigation) + setting up an structure
for pages (scenes) and layouts (master pages).

We will take a startup point sample _01-setup-react_.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v8.9.4 or higher) if they are not already installed on your computer.

> Verify that you are running at least node v8.x.x and npm 5.x.x by running `node -v` and `npm -v`
> in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content of the `01 setup react` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Let's create a folder that will hold the pages from the application we are going to build, things
  to take into account:

  - We will create a root folder called _scenes_ (pages).
  - We will start simple, not having subfolders.
  - What if we need to scale in the future?
    - We will create a barrel (index.ts file) that will hold the exports of all the available pages.
    - By doing this we can refactor and create groups on the pages created without having to impact
      the outer code that is referencing this pages.

- Create a _scenes_ folder under _src_.

- Let's create an empty _index.ts_ file.

- Now let's start with the fun, let's create a _./src/login.page.tsx_

> We are going to use the following naming convention: domain-name.widgettype.(ts|x), e.g.:

- hotel-collection.page.tsx: page that displays list of hotels.
- hotel-collection.business.ts: plain vanilla js business logic.
- hotel-collection.container.tsx: hotel collection container.
- hotel.api.tsx: client rest api.
- (...)

_./src/scenes/login.page.tsx_

```tsx
import * as React from "react";

export const LoginPage = () => (
  <>
    <h2>Hello from login Page</h2>
  </>
);
```

- Now let's create a second page, this page will display a list of hotels:

_./src/scenes/hotel-collection.page.tsx_

```tsx
import * as React from "react";

export const HotelCollectionPage = () => (
  <>
    <h2>Hello from Hotel Collection Page</h2>
  </>
);
```

- Let's export this two pages in our _index_ barrel.

_./src/pages/index.ts_

```typescript
export * from "./login.page";
export * from "./hotel-collection.page";
```

- We got two pages, is time to setup the routing mechanism:

```bash
npm install react-router-dom --save
```

Plus typings

```bash
npm install @types/react-router-dom --save-dev
```

- On the main _index_ file (under _src_), let's setup our routes plus routing container.

_./src/index.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
+ import { HashRouter, Switch, Route } from 'react-router-dom';
+ import { LoginPage, HotelCollectionPage } from './scenes';
- import { HelloComponent } from './hello';

ReactDOM.render(
-   <HelloComponent/>,
+ <HashRouter>
+   <Switch>
+     <Route exact={true} path="/" component={LoginPage} />
+     <Route path="/hotel-collection" component={HotelCollectionPage} />
+   </Switch>
+ </HashRouter>,
  document.getElementById('root')
);
```

- Let's start the project:

```bash
npm start
```

- Fine now we can write in the browser address bar both _http://localhost:8080/#/_ or _http://localhost:8080/#/hotel-collection_ addresses and we got navigation.

That was cool but:

- Why do we get a hash character in the url? You can make use of react-router _HashHistory_ or _BrowserHistory_ (https://stackoverflow.com/questions/36289683/what-is-the-difference-between-hashhistory-and-browserhistory-in-react-router),
- I would like to have some link based navigation, how does it work? Let's jump into this.
- I remember the good old ASP .net days where I had _master pages_ is there a similar concept
  in React? Yups we will go through it.
- What about hardcoding url's... is it considered as a bad practice? Yes let's group them
  in a single place using consts.

- Let's add a couple of links to navigate from login page to hotel collection page and viceversa.

_./src/scenes/login.page.tsx_

```diff
import * as React from "react"
+ import { Link } from "react-router-dom";

export const LoginPage = () =>
    <>
      <h2>Hello from login Page</h2>
+      <Link to="/hotel-collection">Navigate to Hotel Collection</Link>
    </>
```

_./src/scenes/hotel-collection.page.tsx_

```diff
import * as React from "react"
+ import { Link } from "react-router-dom";

export const HotelCollectionPage = () =>
    <>
      <h2>Hello from Hotel Collection Page</h2>
+      <Link to="/">Navigate to Login</Link>
    </>
```

> Note down if you want to navigate programmatically you will need to inject React Router Hoc to
> add that option to the component where you need that feature (more on this on next samples).

> What about hooks and react-router: work still in progress, roadmap: https://github.com/ReactTraining/react-router/issues/6885
> future releases: https://reacttraining.com/blog/reach-react-router-future/ workaround: https://github.com/CharlesStover/use-react-router

> It is possible to create navigation aliases as well (https://stackoverflow.com/questions/43493153/can-i-create-alias-routes-using-react-router), sample:

```tsx
<Route exact={true} path={["/", "/login"]} component={LoginPage} />
```

- Now let's define _master pages_ aka _layouts_ What's that? Imagine you want a group of pages
  to container certain header and footer and you don't want to repeat that code in every single page,
  that's wat layouts are made fo.

- In this case we are going to create a layout that right now it will have styles harcoded
  (in our next example we will move this ot a CSS in JS solution)
  _centeredLayout_.

_./src/layout/centered.layout.tsx_

```tsx
import * as React from "react";

// TODO (next examples): move style to CSS in JS
export const SingleViewLayout: React.FunctionComponent = props => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
      padding: "2rem",
      overflow: "auto"
    }}
  >
    {props.children}
  </div>
);
```

Let's create now a barrer (index) that will contains all the layout exports:

_./src/layout/index.ts_

```tsx
export * from "./centered.layout";
```

- Let's apply this layout in our login page:

_./src/scenes/login.page.tsx_

```diff
import * as React from "react"
import { Link } from "react-router-dom";
+ import {SingleViewLayout} from '../layout';

export const LoginPage = () =>
-    <>
+    <SingleViewLayout>
      <h2>Hello from login Page</h2>
      <Link to="/hotel-collection">Navigate to Hotel Collection</Link>
-    </>
+    </SingleViewLayout>
```

- Let's run the sample, now we get our loginPage centered.

```bash
npm start
```

- That was great, but we are starting to use relative paths on _imports_ (e.g. _'../layout'_),
  this can become a nightmare, having imports like _'../../../../services'_, let's configure some
  root aliases to avoid this.

Let's first configure webpack and create some root folders aliases:

_./webpack.config.js_

```diff
  resolve: {
+    alias: {
+      // Later on we will add more aliases here
+      layout: path.resolve(__dirname, './src/layout/'),
+      scenes: path.resolve(__dirname, './src/scenes/'),
+      core: path.resolve(__dirname, './src/core/'),
+    },
    extensions: [".js", ".ts", ".tsx"]
  },
```

Now we need to add some special configuration to our _tsconfig_ (typescript)

```diff
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "jsx": "react",
    "sourceMap": true,
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true,
+    "baseUrl": "./src/",
+    "paths": {
+      "layout": ["./layout/"],
+      "scenes": ["./scenes/"],
+      "core": ["./core/"]
+    }
  },
  "compileOnSave": false,
  "exclude": ["node_modules"]
}
```

> Once we jump in to unit testing with Jest we will have to add as well this list of aliases.

- Now we can get rid of the _layout_ relative path in _login.page.tsx_.

_./src/scenes/login.page.tsx_

```diff
import * as React from "react"
import { Link } from "react-router-dom";
- import {SingleViewLayout} from '../layout';
+ import {SingleViewLayout} from 'layout';
```

- As last step we will remove harcoded routes entries, and wrap all the routes in a const file
  (note down we need to add additional plumbing because routes definitions are different from links
  if you have to handle parameters), just to check how this works we will include a route that we will
  use in the future (hotel edit).

_./src/core/routes.ts_

```typescript
import { generatePath } from "react-router";

type NavigationFunction = (id: string) => string;

interface BaseRoutes {
  login: string;
  hotelCollection: string;
  hotelEdit: string | NavigationFunction;
}

interface AppBaseRoutes extends BaseRoutes {
  hotelEdit: string;
}

interface RoutesLinks extends BaseRoutes {
  hotelEdit: NavigationFunction;
}

type RouterSwitchRoutes = AppBaseRoutes;

const appBaseRoutes: AppBaseRoutes = {
  login: "/",
  hotelCollection: "/hotel-collection",
  hotelEdit: "/hotel-edit"
};

export const routerSwitchRoutes: RouterSwitchRoutes = {
  ...appBaseRoutes,
  hotelEdit: `/${appBaseRoutes.hotelEdit}/:id`
};

export const routesLinks: RoutesLinks = {
  ...appBaseRoutes,
  hotelEdit: id => generatePath(routerSwitchRoutes.hotelEdit, { id })
};
```

- Let's create a barrel.

_./src/core/index.ts_

```typescript
export * from "./routes";
```

- Let's replace our hardcoded values with this consts.

_./src/index.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HotelCollectionPage } from './scenes';
+ import {routerSwitchRoutes} from 'core';

ReactDOM.render(
   <HashRouter>
     <Switch>
       <Route
          exact={true}
-          path='/'
+          path={routerSwitchRoutes.login}
          component={LoginPage} />
       <Route
-          path="/hotel-collection",
+          path={routerSwitchRoutes.hotelCollection}
          component={HotelCollectionPage} />
     </Switch>
   </HashRouter>,
  document.getElementById('root')
);
```

- Now let's replace harcoded entries in the Link components.

_./src/scenes/login.page.tsx_

```diff
import * as React from "react"
import { Link } from "react-router-dom";
- import {SingleViewLayout} from '../layout';
+ import {SingleViewLayout} from 'layout';
+ import {routesLinks} from 'core';

export const LoginPage = () =>
    <SingleViewLayout>
      <h2>Hello from login Page</h2>
      <Link
+        to={routesLinks.hotelCollection}
-        to="/hotel-collection"
      >Navigate to Hotel Collection</Link>
    </SingleViewLayout>
```

_./src/scenes/hotel-collection.page.tsx_

```diff
import * as React from "react"
import { Link } from "react-router-dom";
+ import {routesLinks} from 'core';

export const HotelCollectionPage = () =>
    <>
      <h2>Hello from Hotel Collection Page</h2>
      <Link
+        to={routesLinks.login}
-        to="/"
        >Navigate to login</Link>
    </>
```
