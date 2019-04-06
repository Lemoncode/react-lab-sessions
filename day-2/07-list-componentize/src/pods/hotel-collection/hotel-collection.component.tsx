import * as React from "react";

import { HotelEntityVm } from "./hotel-collection.vm";
import { HotelCard } from "./components/hotel-card.component"; // on next step we will create this component

interface Props {
  hotelCollection: HotelEntityVm[];
}

export const HotelCollectionComponent = (props: Props) => {
  const { hotelCollection } = props;

   return (
     <>
        {
           hotelCollection.map((hotel) => <HotelCard hotel={hotel}/>)
        }
    </>
     )
    };
