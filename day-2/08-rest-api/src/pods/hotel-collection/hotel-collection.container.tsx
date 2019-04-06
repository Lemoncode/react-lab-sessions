import * as React from "react";
import { HotelCollectionComponent } from "./hotel-collection.component";
import { HotelEntityVm } from "./hotel-collection.vm";
import { basePicturesUrl } from "core";
import { getHotelCollection, HotelEntityApi } from "./hotel-collection.api";
import { mapFromApiToVm } from "./hotel-collection.mapper";
import { mapFromAToBCollection } from "common";

export const HotelCollectionContainer = () => {
  const [hotelCollection, setHotelCollection] = React.useState<HotelEntityVm[]>(
    []
  );

  React.useEffect(() => {
    getHotelCollection().then(result =>
      setHotelCollection(mapFromAToBCollection(mapFromApiToVm, result))
    );
  }, []);

  return <HotelCollectionComponent hotelCollection={hotelCollection} />;
};
