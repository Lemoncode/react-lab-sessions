export const mapFromAToBCollection = <ORIGIN, DESTINATION>(
  singleMapperfn: (ORIGIN) => DESTINATION,
  inputCollection: ORIGIN[]
): DESTINATION[] => inputCollection.map(singleMapperfn);
