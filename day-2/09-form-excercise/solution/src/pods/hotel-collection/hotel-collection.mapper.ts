import {HotelEntityApi} from './hotel-collection.api';
import {HotelEntityVm} from './hotel-collection.vm';
import {basePicturesUrl} from 'core';

export const mapFromApiToVm = (apiEntity : HotelEntityApi) : HotelEntityVm => ({
  id : apiEntity.id,
  picture : `${basePicturesUrl}${apiEntity.thumbNailUrl}`,
  name : apiEntity.name,
  description : apiEntity.shortDescription,
  rating : apiEntity.hotelRating,
  address : apiEntity.address1,
});
    


