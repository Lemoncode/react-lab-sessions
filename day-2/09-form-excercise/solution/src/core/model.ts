export interface LookupEntity {
  id : string;
  value : string;
}

export const createLookupEmpty = (): LookupEntity => ({
  id: "",
  value: "",
});