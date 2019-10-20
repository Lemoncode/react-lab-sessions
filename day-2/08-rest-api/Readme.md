
# 08 Rest api
In this example we are going to display a list of hotels, we will make use of viewmodels and mock
data to isolate this from building a rest api, then we will componentize the solution
(container, component, card... breakdown).

We will take a startup point sample _/day-2/07/list/componentize_.

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

- Copy the content of the `/day-2/07/list/componentize` folder to an empty folder for the sample.

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

- Let's start the mock server.

```bash
npm start
```

- We can open our browser or post man and enter the following url:

```
http://localhost:3000/api/hotels
```

From there we can extract the structure for our front end entities.

Let's build an hotel collection api + model (depending on how this grow we could
create a subfolder named api or just a single api file)

_./src/pods/hotel-collection/hotel-collection.api.ts_

```typescript
export interface HotelEntityApi {
    id: string;
    type: string;
    name: string;
    created: Date;
    modified: Date;
    address1: string,
    airportCode: string;
    amenityMask: number;
    city: string;
    confidenceRating: number;
    countryCode: string;
    deepLink: string;
    highRate: number;
    hotelId: number;
    hotelInDestination: boolean;
    hotelRating: number;
    location: {
      latitude: number;
      longitude: number;
    },
    locationDescription: string;
    lowRate: number;
    metadata: {
      path: string;
    },
    postalCode: number;
    propertyCategory: number;
    proximityDistance: number;
    proximityUnit: string;
    rateCurrencyCode: string;
    shortDescription: string;
    stateProvinceCode: string;
    thumbNailUrl: string;
    tripAdvisorRating: number;
    tripAdvisorRatingUrl: string;  
}
```

- To handle calls to rest api we are going to install _axios_.

```bash
npm install axios --save
```
- Let's add a base api url:

_./src/core/const.ts_

```diff
export const basePicturesUrl = 'http://localhost:3000';
+ export const baseApiUrl = 'http://localhost:3000';
```

- Let's add some import to the top of the _api_ file:

_./src/pods/hotel-collection/hotel-collection.api.ts_

```diff
+ import Axios from 'axios';
+ import { baseApiUrl } from 'core';
```

- Let's append to the _api_ file the following function (getting data from remote source).

_./src/pods/hotel-collection/hotel-collection.api.ts_

```typescript
// (...)
const getHotelsUrl = `${baseApiUrl}/api/hotels`;

// TODO: Just only managing the "happy path", adding error handling here or upper level 
// would be a good idea
export const getHotelCollection = (): Promise<HotelEntityApi[]> =>
  Axios.get<HotelEntityApi[]>(getHotelsUrl).then(({ data }) => data);

```

- Now if we try to jump to the component side we will check that we have a mistmatch of entities, we cannot directly
consume api entities becasue viewmodels are a simplified version of that entities (and this is a good idea it simplified
a lot the development of the UI layer), let's build a mapper to convert from api hotel entities to vm hotel entities:

_./src/pods/hotel-collection/hotel-collection.mapper.ts_

```typescript
import { basePicturesUrl } from 'core';
import * as apiModel from './hotel-collection.api';
import * as viewModel from './hotel-collection.vm';

export const mapFromApiToVm = (hotel: apiModel.HotelEntityApi): viewModel.HotelEntityVm => ({
  id: hotel.id,
  picture: `${basePicturesUrl}${hotel.thumbNailUrl}`,
  name: hotel.name,
  description: hotel.shortDescription,
  rating: hotel.hotelRating,
  address: hotel.address1,
});

``` 

> Important, we should add unit testing to this mappers and cover edge cases like null arrays, undefined...

- We could create a specific mapper for collections, but we can implement this in a generic way:

_./src/common/mappers/collection.mapper.ts_

```typescript
export const mapToCollection = <A, B>(collection: A[], mapFn: (A) => B): B[] =>
  Array.isArray(collection) ? collection.map(mapFn) : [];

```
- Let's add it to an index barrel.

_./src/common/mappers/index.ts_

```typescript
export * from './collection.mapper';

```

- Now it's time to jump into the UI side, let's open the _HotelCollectionContainer_

- Let's first remove the harcoded entries

_./src/pods/hotel-collection/hotel-collection.container.tsx_

```diff
import {basePicturesUrl} from 'core';

- export const createMockHotelCollection = () : HotelEntityVm[] => ([
- {
-   "id": "0248058a-27e4-11e6-ace6-a9876eff01b3",
-   "picture": `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
-   "name": "Motif Seattle",
-   "description": "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within", 
-   "address": "1415 5th Ave",
-   "rating": 4,  
- },
- {
-   "id": "024bd61a-27e4-11e6-ad95-35ed01160e57",
-   "picture": `${basePicturesUrl}/thumbnails/16673_260_t.jpg`,
-  "name": "The Westin Seattle",
-  "address": "1900 5th Ave",
-  "description": "With a stay at The Westin Seattle, you'll be centrally laocated in Seattle, steps from Westlake Center and minutes from Pacific Place. This 4-star hotel is close to",
-  "rating": 4,
-},
-]);

export const HotelCollectionContainer = () => {
```

- Let's add the following imports:

_./src/pods/hotel-collection/hotel-collection.container.tsx_

```diff
...
- import {basePicturesUrl} from 'core';
+ import { getHotelCollection } from './hotel-collection.api';
+ import { mapFromApiToVm } from './hotel-collection.mapper';
+ import { mapToCollection } from 'common/mappers';
```

- Now let's make use of _React.UseEffect_ to call the api when the component is mounted.

_./src/pods/hotel-collection/hotel-collection.container.tsx_

```diff
export const HotelCollectionContainer = () => {
- const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(createMockHotelCollection());  
+ const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>([]);  

+ React.useEffect(() => {
+   getHotelCollection().then(result =>
+     setHotelCollection(mapToCollection(result, mapFromApiToVm))
+   );
+ }, []);

  return (
    <HotelCollectionComponent hotelCollection={hotelCollection}/>
  );
}
```

- We could wrap into a custom hook the loading hotel functinallity:

_./src/pods/hotel-collection/hotel-collection.container.tsx_

```diff
+ const useHotelCollection = () => {
+   const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(
+     []
+   );
+ 
+   const loadHotelCollection = () => {
+     getHotelCollection().then(result =>
+       setHotelCollection(mapToCollection(result, mapFromApiToVm))
+     );
+   };
+ 
+   return { hotelCollection, loadHotelCollection };
+ };

export const HotelCollectionContainer = () => {
-  const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>([]);
+  const { hotelCollection, loadHotelCollection } = useHotelCollection();

  React.useEffect(() => {
-   getHotelCollection().then(result =>
-     setHotelCollection(mapToCollection(result, mapFromApiToVm))
-   );
+   loadHotelCollection();
  }, []);

  return <HotelCollectionComponent hotelCollection={hotelCollection} />;
};
```

# Excercises

- Add a loading spinner when data is being loading (take a look to react-promise-tracker).



