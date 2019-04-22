import * as React from "react";
import { HotelCollectionComponent } from "./hotel-collection.component";
import { HotelEntityVm } from "./hotel-collection.vm";
import { basePicturesUrl, routesLinks } from "core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getHotelCollection, HotelEntityApi } from "./hotel-collection.api";
import { mapFromApiToVm } from "./hotel-collection.mapper";
import { mapFromAToBCollection } from "common";

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

interface Props extends RouteComponentProps {}

export const HotelCollectionContainerInner = (props : Props) => {
  const {hotelCollection, loadHotelCollection} = useHotelCollection();

  const editHotel = (hotelId : string) => {      
    props.history.push(routesLinks.hotelEdit(hotelId));
  }

  React.useEffect(() => {
    loadHotelCollection();
  }, []);

  return <HotelCollectionComponent 
            hotelCollection={hotelCollection} 
            editHotel = {editHotel}
          />;
};

export const HotelCollectionContainer = withRouter<Props>(HotelCollectionContainerInner);
