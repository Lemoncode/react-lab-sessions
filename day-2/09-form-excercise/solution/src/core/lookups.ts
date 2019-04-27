import { LookupEntity } from "./model";

export const noCitySelectedLiteral = "No city selected";

export const citiesLookup: LookupEntity[] = [
  {
    id: noCitySelectedLiteral,
    value: noCitySelectedLiteral
  },
  {
    id: "Seattle",
    value: "Seattle"
  },
  {
    id: "Chicago",
    value: "Chicago"
  },
  {
    id: "New York",
    value: "New York"
  },
  {
    id: "California",
    value: "California"
  }
];
