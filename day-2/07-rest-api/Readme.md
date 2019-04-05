# 06 Rest api

In this example we are going to consume data from a remote rest api. We will get
from a remote rest-api a list containing hotel informatin.

We will take a startup point sample _/day-2/06-global-data_.

Summary steps:

- Start the rest mock server.
- Check the data structure.
- Create the hotel list pod.
- Follow progressive approach, create a viewModel.
- Build up the layout of a single card showing harcoded data.
- Build up the layout of a list of cards showing harcoded data.
- Create an api model.
- Create an api client.
- Create a mapper to convert from apiModel to ViewModel.
- Integrate it on the page.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

## Steps to build it

- Copy the content of the `/day-2/06-global-data` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Let's start our rest mock server.

- This server is under the _/backend_ folder, cd into that folder, and execute _npm install_

**from root folder**
```bash
cd backend
```

```bash
npm install
```

- Let's start the mock server.

```bash
npm start
```

- We can open our browser or post man and enter the following url:

```
http://localhost:3000/api/hotels
```

From there we can extract the structur for our front end entities.

- Now we can go back to our front end application.

- Let's create an _hotel-collection_ pod.

- We want to model an hotel card, fields that we want to display:
  - Hotel picture.
  - Hotel name.
  - Hotel description.
  - Hotel rating.
  - Hotel address.

_./src/pods/hotel-collection/hotel-collection.vm.ts_

```typescript
export interface Hotel {
  picture : string;
  name : string;
  description : string;
  rating : number;
  address : string;
}
```

> Note down this is not a 1 to 1 mapping with what we get from the hotel rest api endpoint, that's
the beauty of view models, define and consume the data you need including names that make sense 
for the domain we are working on.

- Le'ts create the skeleton from the _hotel-collection.container.tsx_, _hotel-collection.component.tsx_,
_index.ts_

_./src/pods/hotel-collection/hotel-collection.component.tsx_

```tsx
import * as React from "react";

export const HotelCollectionComponent = () => {
  return (
    <h1>Hello from collection component</h1>
  );
}
```

_./src/pods/hotel-collection/hotel-collection.container.tsx_

```tsx
import * as React from "react";
import { HotelCollectionComponent } from './hotel-collection.component'

export const HotelCollectionContainer = () => {
  return (
    <HotelCollectionComponent/>
  );
}
```

_./src/pods/hotel-collection/index.tsx_

```tsx
export * from './hotel.collection.container';
```

- Let's instante the _HotelCollectionContainer_ in our hotel collection scene.

_./src/scenes/hotel-collection.page.tsx_

```diff
import * as React from "react"
import { Link } from "react-router-dom";
import {routesLinks} from 'core';
import { AppLayout } from "layout";
+ import { HotelCollectionContainer } from 'pods/hotel-collection';

export const HotelCollectionPage = () =>
    <AppLayout>
+       <HotelCollectionContainer/>        
-       <h2>Hello from Hotel Collection Page</h2>
-       <Link to={routesLinks.login}>Navigate to Login</Link>
    </AppLayout>
```

- Let's give a try.

```
npm start
```
- 

# Excercises


