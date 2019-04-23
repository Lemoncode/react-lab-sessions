import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { hotelEditRouteParams } from 'core';
import { HotelEditComponent } from './hotel-edit.component';
import { hotelMockData } from './hotel-edit.mock';
import { HotelEntityVm, createDefaultHotel } from './hotel-edit.vm';
import { citiesLookup } from 'core';

interface Props extends RouteComponentProps {}

const HotelEditContainerInner = (props : Props) => {
  const [hotel, setHotel] = React.useState(createDefaultHotel()); 
  const [cities] = React.useState(citiesLookup);

  React.useEffect(() => {
    setHotel(hotelMockData);
  }, [])


  const onFieldUpdate = (id : keyof HotelEntityVm, value : any) => {
    setHotel({
      ...hotel,
      [id]: value
    })
  } 

  const loadHotel = () => {    
    console.log(props.match.params[hotelEditRouteParams.id]);
  }

  React.useEffect(() => {
    loadHotel();
  }, [])

  return (
    <>
      <HotelEditComponent 
          hotel={hotel} 
          cities={cities}
          onFieldUpdate={onFieldUpdate}
          />
    </>
  )
}

export const HotelEditContainer = withRouter<Props>(HotelEditContainerInner);



