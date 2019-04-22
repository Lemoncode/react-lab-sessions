import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { hotelEditRouteParams } from 'core';
import { HotelEditComponent } from './hotel-edit.component';
import { hotelMockData } from './hotel-edit.mock';
import { createDefaultHotel } from './hotel-edit.vm';

interface Props extends RouteComponentProps {}

const HotelEditContainerInner = (props : Props) => {
  const [hotel, setHotel] = React.useState(createDefaultHotel());      
  React.useEffect(() => {
    setHotel(hotelMockData);
  }, [])


  const loadHotel = () => {    
    console.log(props.match.params[hotelEditRouteParams.id]);
  }

  React.useEffect(() => {
    loadHotel();
  }, [])

  return (
    <>
      <HotelEditComponent hotel={hotel}/>
    </>
  )
}

export const HotelEditContainer = withRouter<Props>(HotelEditContainerInner);



