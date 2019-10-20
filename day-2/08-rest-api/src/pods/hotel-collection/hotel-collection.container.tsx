import * as React from 'react';
import { HotelCollectionComponent } from './hotel-collection.component';
import { HotelEntityVm } from './hotel-collection.vm';
import { getHotelCollection } from './hotel-collection.api';
import { mapFromApiToVm } from './hotel-collection.mapper';
import { mapToCollection } from 'common/mappers';

const useHotelCollection = () => {
  const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(
    []
  );

  const loadHotelCollection = () => {
    getHotelCollection().then(result =>
      setHotelCollection(mapToCollection(result, mapFromApiToVm))
    );
  };

  return { hotelCollection, loadHotelCollection };
};

export const HotelCollectionContainer = () => {
  const { hotelCollection, loadHotelCollection } = useHotelCollection();

  React.useEffect(() => {
    loadHotelCollection();
  }, []);

  return <HotelCollectionComponent hotelCollection={hotelCollection} />;
};
