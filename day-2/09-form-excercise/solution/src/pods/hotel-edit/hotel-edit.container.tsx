import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { hotelEditRouteParams } from "core";
import { HotelEditComponent } from "./hotel-edit.component";
import { hotelMockData } from "./hotel-edit.mock";
import {
  HotelEntityVm,
  createDefaultHotel,
  HotelFormErrors,
  createDefaultHotelFormErrors
} from "./hotel-edit.vm";
import { citiesLookup } from "core";
import { hotelFormValidation } from "./hotel-edit.validation";
import { FieldValidationResult } from "lc-form-validation";

interface Props extends RouteComponentProps {}

const HotelEditContainerInner = (props: Props) => {
  const [hotel, setHotel] = React.useState(createDefaultHotel());
  const [cities] = React.useState(citiesLookup);

  React.useEffect(() => {
    setHotel(hotelMockData);
  }, []);

  const [hotelFormErrors, setHotelFormErrors] = React.useState<HotelFormErrors>(
    createDefaultHotelFormErrors()
  );

  const onFieldUpdate = (id: keyof HotelEntityVm, value: any) => {
    setHotel({
      ...hotel,
      [id]: value
    });

    hotelFormValidation
      .validateField(hotel, id, value)
      .then(fieldValidationResult => {
        if (fieldValidationResult) {
          setHotelFormErrors({
            ...hotelFormErrors,
            [id]: fieldValidationResult
          });
        }
      });
  };

  const loadHotel = () => {
    console.log(props.match.params[hotelEditRouteParams.id]);
  };

  React.useEffect(() => {
    loadHotel();
  }, []);

  const doSave = () => {
    hotelFormValidation.validateForm(hotel).then(formValidationResult => {
      if (formValidationResult.succeeded) {
        console.log("Succeeded !!! entry point to implement real save");
      } else {
        console.log(
          "Validation field you have to reivew some fields, show a snack bar here"
        );
      }
    });
  };

  return (
    <>
      <HotelEditComponent
        hotel={hotel}
        cities={cities}
        onFieldUpdate={onFieldUpdate}
        formErrors={hotelFormErrors}
        onSave={doSave}
      />
    </>
  );
};

export const HotelEditContainer = withRouter<Props>(HotelEditContainerInner);
