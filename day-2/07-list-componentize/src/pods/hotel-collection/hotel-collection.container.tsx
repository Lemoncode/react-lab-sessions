import * as React from 'react';
import { HotelCollectionComponent } from './hotel-collection.component';
import { HotelEntityVm } from './hotel-collection.vm';
import { basePicturesUrl } from 'core';

export const createMockHotelCollection = (): HotelEntityVm[] => [
  {
    id: '0248058a-27e4-11e6-ace6-a9876eff01b3',
    picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
    name: 'Motif Seattle',
    description:
      'With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within',
    address: '1415 5th Ave',
    rating: 4,
  },
  {
    id: '024bd61a-27e4-11e6-ad95-35ed01160e57',
    picture: `${basePicturesUrl}/thumbnails/16673_260_t.jpg`,
    name: 'The Westin Seattle',
    address: '1900 5th Ave',
    description:
      "With a stay at The Westin Seattle, you'll be centrally laocated in Seattle, steps from Westlake Center and minutes from Pacific Place. This 4-star hotel is close to",
    rating: 4,
  },
];

export const HotelCollectionContainer = () => {
  const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(
    createMockHotelCollection()
  );

  return <HotelCollectionComponent hotelCollection={hotelCollection} />;
};
