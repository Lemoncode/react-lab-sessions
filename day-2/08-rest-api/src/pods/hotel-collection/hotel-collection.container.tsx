import * as React from "react";
import { HotelCollectionComponent } from "./hotel-collection.component";
import { HotelEntityVm } from "./hotel-collection.vm";
import { basePicturesUrl } from "core";
import { getHotelCollection, HotelEntityApi } from "./hotel-collection.api";
import { mapFromApiToVm } from "./hotel-collection.mapper";
import { mapFromAToBCollection } from "common/utils";

const useHotelCollection = () => {
  const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(
    []
  );

  const loadHotelCollection = () =>
    getHotelCollection().then(result =>
      setHotelCollection(mapFromAToBCollection(mapFromApiToVm, result))
    );

  return { hotelCollection, loadHotelCollection };
};

export const HotelCollectionContainer = () => {
  const { hotelCollection, loadHotelCollection } = useHotelCollection();

  React.useEffect(() => {
    loadHotelCollection();
  }, []);

  return <HotelCollectionComponent hotelCollection={hotelCollection} />;
};
