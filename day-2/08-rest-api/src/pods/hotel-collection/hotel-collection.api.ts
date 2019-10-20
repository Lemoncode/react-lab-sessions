import Axios from 'axios';
import { baseApiUrl } from 'core';

export interface HotelEntityApi {
  id: string;
  type: string;
  name: string;
  created: Date;
  modified: Date;
  address1: string;
  airportCode: string;
  amenityMask: number;
  city: string;
  confidenceRating: number;
  countryCode: string;
  deepLink: string;
  highRate: number;
  hotelId: number;
  hotelInDestination: boolean;
  hotelRating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  locationDescription: string;
  lowRate: number;
  metadata: {
    path: string;
  };
  postalCode: number;
  propertyCategory: number;
  proximityDistance: number;
  proximityUnit: string;
  rateCurrencyCode: string;
  shortDescription: string;
  stateProvinceCode: string;
  thumbNailUrl: string;
  tripAdvisorRating: number;
  tripAdvisorRatingUrl: string;
}

const getHotelsUrl = `${baseApiUrl}/api/hotels`;

// TODO: Just only managing the "happy path", adding error handling here or upper level
// would be a good idea
export const getHotelCollection = (): Promise<HotelEntityApi[]> =>
  Axios.get<HotelEntityApi[]>(getHotelsUrl).then(({ data }) => data);
