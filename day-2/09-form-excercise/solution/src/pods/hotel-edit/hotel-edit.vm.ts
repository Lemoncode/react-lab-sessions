import { FieldValidationResult } from "lc-form-validation";

export interface HotelEntityVm {
  id : string;
  picture : string;
  name : string;
  description : string;
  rating : number;
  address : string;
  city : string;
}

export const createDefaultHotel = ()  : HotelEntityVm => ({
  id: '0',
  picture: '',
  name: '',
  description: '',
  rating: 3,
  address: '',
  city: '',
});

export interface HotelFormErrors {
  id: FieldValidationResult;
  picture: FieldValidationResult;
  name: FieldValidationResult;
  description: FieldValidationResult;
  rating: FieldValidationResult;
  address: FieldValidationResult;
  city: FieldValidationResult;
}

export const createDefaultHotelFormErrors = (): HotelFormErrors => ({
  id: new FieldValidationResult(),
  picture:  new FieldValidationResult(),
  name:  new FieldValidationResult(),
  description:  new FieldValidationResult(),
  rating:  new FieldValidationResult(),
  address:  new FieldValidationResult(),
  city:  new FieldValidationResult(),
});