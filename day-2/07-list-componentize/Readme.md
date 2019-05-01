# 07 Componetize

In this examnple we are going to display an hotel list, we will create viemodels plus mock data to isolate 
us from having to access a rest api, and we are going to componentize the solution.

We will take a startup point sample _/day-2/06-global-data_.

Summary steps:

- Start the rest mock server.
- Check the data structure.
- Create the hotel list pod.
- Follow progressive approach, create a viewModel.
- Build up the layout of a single card showing harcoded data.
- Build up the layout of a list of cards showing harcoded data.


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
export interface HotelEntityVm {
  id : string;
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

- Next step let's start building an hotel card:
  - We will use material ui card (https://material-ui.com/demos/cards/).
  - We will create a simple entry just to build the card.
  - Once we are done with the card, we will just create an array of 
  hotels and loop through it.

- Let's create some fake data on the _hotel-collection-container_

_./src/pods/hotel-collection/hotel-collection.container.tsx_

```diff
import * as React from "react";
import { HotelCollectionComponent } from './hotel-collection.component'

+ export const createMockHotelCollection = () : HotelEntityVm[] => ([
+ {
+  "id": "0248058a-27e4-11e6-ace6-a9876eff01b3",
+  "picture": "/thumbnails/50947_264_t.jpg",    
+  "name": "Motif Seattle",
+  "description": "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within", 
+  "address": "1415 5th Ave",
+  "rating": 4,  
+ },
+ {
+  "id": "024bd61a-27e4-11e6-ad95-35ed01160e57",
+  "picture": "/thumbnails/16673_260_t.jpg",
+  "name": "The Westin Seattle",
+  "address": "1900 5th Ave",
+  "description": "With a stay at The Westin Seattle, you'll be centrally laocated in Seattle, steps from Westlake Center and minutes from Pacific Place. This 4-star hotel is close to",
+  "rating": 4,
+},
+]);

export const HotelCollectionContainer = () => {
+ const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(createMockHotelCollection());

  return (
-    <HotelCollectionComponent/>
+    <HotelCollectionComponent hotelCollection={hotelCollection}/>
  );
}
```

- Let's jump into our _HotelCollection_ component, and include this property plus a reference
to an _HotelCard_ component that we are about to create.

_./src/pods/hotel-collection/hotel-collection.component.tsx_

```diff
import * as React from "react";
+ import {HotelEntityVm} from './hotel-collection.vm';
+ import {HotelCard} from './components/hotel-card.component' // on next step we will create this component

+ interface Props {
+  hotelCollection : HotelEntityVm[]
+ }

- export const HotelCollectionComponent = () => {
+ export const HotelCollectionComponent = (props : Props) => {  
+  const {hotelCollection} = props;
  return (    
-    <h1>Hello from collection component</h1>
+    <HotelCard hotel={hotelCollection[0]}/>
  );
}
```

- Let's create a subfolder called components, and from there we will
create a component called _hotel-card.component.tsx_

_./src/pods/hotel-collection/components/hotel-card.component.tsx_

```tsx
import * as React from "react"
import Card from '@material-ui/core/Card';
import { HotelEntityVm } from "../hotel-collection.vm";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardContent, CardMedia, Typography, CardActions } from "@material-ui/core";

interface Props {
  hotel: HotelEntityVm;
}

// Todo there are some harcoded styles move them to class styles
export const HotelCard = (props: Props) => {
  const {hotel} = props;

  return (
    <Card>
    <CardHeader 
      avatar={
        <Avatar aria-label="Hotel">
        {hotel.rating}
        </Avatar>
      }
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }                  
      title={hotel.name} 
      subheader={hotel.address}
    />
    <CardContent>
      <div style=
        {{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <CardMedia
          image={hotel.picture}
          title={hotel.name}
          style={{height: 0 , paddingTop: '56.25%'}}
        />
        <Typography variant="subtitle1" gutterBottom>
          {hotel.description}
        </Typography>
      </div>
    </CardContent>
    <CardActions disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
)
}
```

- Let's give a try

```
npm start
```

- Not bad we got a nice card but no hotel picture, that is 
because:

a. We are not running our data mock server.

b. Picture are referenced using a relative path we need to 
add server prefix.

- To run the mock server go to the root folder of this repo
cd on _backed_ ensure you have previously executed _npm install_
under that folder and run:

```bash
npm run mock-server
```

- We have to add now the server prefix to the pictures to
be displayed:

  - We will define this prefix under _./src/core/const.ts_
  - On a real development instead of harcoding _http://localhost:3000_
  we would just point to environment variables.
  - Then we will expose it under the _common/inded.ts_ and update this in the 
  viewmodel (later on we will update this on the hotel Entity mapper)

_./src/core/const.ts_

```typescript
export const basePicturesUrl = 'http://localhost:3000'
```
_./src/core/index.ts_

```diff
export * from './routes';
export * from './sessionContext';
+ export * from './const';
```
_./src/pods/hotel-collection/hotel-collection.container.tsx_

```diff
+ import {basePicturesUrl} from 'core';

export const createMockHotelCollection = () : HotelEntityVm[] => ([
{
  "id": "0248058a-27e4-11e6-ace6-a9876eff01b3",
-  "picture": "/thumbnails/50947_264_t.jpg",    
+  "picture": `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,    
  "name": "Motif Seattle",
  "description": "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within", 
  "address": "1415 5th Ave",
  "rating": 4,  
},
{
  "id": "024bd61a-27e4-11e6-ad95-35ed01160e57",
+  "picture": `${basePicturesUrl}/thumbnails/16673_260_t.jpg`,     
-  "picture": "/thumbnails/16673_260_t.jpg",
  "name": "The Westin Seattle",
  "address": "1900 5th Ave",
  "description": "With a stay at The Westin Seattle, you'll be centrally laocated in Seattle, steps from Westlake Center and minutes from Pacific Place. This 4-star hotel is close to",
  "rating": 4,
},
]);
```

- Great we a single hotel being displayed, how could
we get displayed the list of hotels? We only need to 
add a _map_ sentence to our _hotelCollectionComponent_
and display as much cards as items we have.

_./src/pods/hotel-collection/hotel-collection.component.tsx_

```diff
interface Props {
  hotelCollection: HotelEntityVm[];
}

export const HotelCollectionComponent = (props: Props) => {
  const { hotelCollection } = props;

-   return <HotelCard hotel={hotelCollection[0]} />;
+ return (
+    <>  
+    {
+       hotelCollection.map((hotel) => <HotelCard hotel={hotel}/>)
+    }
+    </>
+ )
};

```

- Not bad we got the list being displayed, but... it needs some CSS magic to make it look perfect, let's pimp
a bit the UI.

- Instead of using inline styles we are going to start CSS in JS, let's first configure this for the 
_HotelCollectionComponent_ (use Hoc to inject styles into the component and add typing for that types
by adding them to the props interface).

_./src/pods/hotel-collection/hotel-collection.component.tsx_

```diff
import * as React from "react";
+ import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { HotelEntityVm } from "./hotel-collection.vm";
import { HotelCard } from "./components/hotel-card.component"; // on next step we will create this component

- interface Props {
+ interface Props extends WithStyles<typeof styles> {  
  hotelCollection: HotelEntityVm[];
}

+ const styles = theme => createStyles({
+ });

- export const HotelCollectionComponent = (props: Props) => {
+ export const HotelCollectionComponentInner = (props: Props) => {  
  const { hotelCollection } = props;

  return (
    <>
      {hotelCollection.map(hotel => (
        <HotelCard hotel={hotel} />
      ))}
    </>
  );
};

+ export const HotelCollectionComponent = withStyles(styles)(HotelCollectionComponentInner);
```

- Let's start by adding a flex layout to the list of cards.

```diff
const styles = theme => createStyles({
+ listLayout: {
+   display: 'flex',
+   flexWrap: 'wrap',
+   justifyContent: 'space-between',
+ }
});
    

export const HotelCollectionComponentInner = (props: Props) => {  
-  const { hotelCollection } = props;
+  const { hotelCollection, classes } = props;

  return (
-     <>
+     <div className={classes.listLayout}>
      {hotelCollection.map(hotel => (
        <HotelCard hotel={hotel} />
      ))}
-     </>
+     </div>
  );
};
```

- Let's jump into the card itself and define a card width and height.

_./src/pods/hotel-collection/components/hotel-card.component.tsx_

```diff
+ import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
+ import {Theme} from "@material-ui/core/styles";

- interface Props {
+ interface Props extends WithStyles<typeof styles> {    
  hotel: HotelEntityVm;
}

+ const styles = (theme  : Theme) => createStyles({
+   card: {
+     width: '500px', // rather be rem?
+     marginTop: theme.spacing.unit,
+   },  
+ });


- export const HotelCard = (props: Props) => {
+ export const HotelCardInner = (props: Props) => {
-  const {hotel} = props;
+  const {hotel, classes} = props;

  return (
-  <Card>
+  <Card className={classes.card}>
  // (...)
  </Card>
)
}

+ export const HotelCard = withStyles(styles)(HotelCardInner);
```

# Excercises

- Move all the inline styling to CSS in JS.
- Componentize the card (if not done before).


