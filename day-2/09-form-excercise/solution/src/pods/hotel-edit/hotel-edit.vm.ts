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