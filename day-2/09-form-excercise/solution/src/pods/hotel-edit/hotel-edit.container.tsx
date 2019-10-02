import * as React from "react";
import { mapFromAToBCollection } from "common/utils";
import { HotelEditComponent } from "./hotel-edit.component";
import { HotelEntityVm, createDefaultHotel } from "./hotel-edit.vm";
import { citiesLookup } from "core";
import { hotelMockData } from "./hotel-edit.mock";

export const HotelEditContainer = () => {
  const [hotel, setHotel] = React.useState(createDefaultHotel());
  const [cities] = React.useState(citiesLookup);

  React.useEffect(() => {
    setHotel(hotelMockData);
  }, []);

  // TODO: Read Id from useLocation? react-router-dom

  return <HotelEditComponent initialHotel={hotel} cities={cities} />;
};
