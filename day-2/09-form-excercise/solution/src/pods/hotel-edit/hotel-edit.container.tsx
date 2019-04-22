import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { hotelEditRouteParams } from 'core';
import { HotelEditComponent } from './hotel-edit.component';

interface Props extends RouteComponentProps {}

const HotelEditContainerInner = (props : Props) => {
  const loadHotel = () => {    
    console.log(props.match.params[hotelEditRouteParams.id]);
  }

  React.useEffect(() => {
    loadHotel();
  }, [])

  return (
    <>
      <HotelEditComponent/>
    </>
  )
}

export const HotelEditContainer = withRouter<Props>(HotelEditContainerInner);



