import * as React from "react";
import { HotelCollectionComponent } from "./hotel-collection.component";
import { HotelEntityVm } from "./hotel-collection.vm";
import { basePicturesUrl, routesLinks } from "core";
import { getHotelCollection, HotelEntityApi } from "./hotel-collection.api";
import { mapFromApiToVm } from "./hotel-collection.mapper";
import { mapFromAToBCollection } from "common/utils";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const navigateToEditHotel = (id: string) => {
    history.push(routesLinks.hotelEdit(id));
  };

  return (
    <HotelCollectionComponent
      hotelCollection={hotelCollection}
      navigateToEditHotel={navigateToEditHotel}
    />
  );
};
