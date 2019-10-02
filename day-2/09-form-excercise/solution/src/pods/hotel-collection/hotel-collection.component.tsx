import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { HotelEntityVm } from "./hotel-collection.vm";
import { HotelCard } from "./components/hotel-card.component"; // on next step we will create this component

interface Props {
  hotelCollection: HotelEntityVm[];
  navigateToEditHotel: (id: string) => void;
}

const useStyles = makeStyles({
  listLayout: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});

export const HotelCollectionComponent = (props: Props) => {
  const classes = useStyles(props);
  const { hotelCollection, navigateToEditHotel } = props;
  return (
    <div className={classes.listLayout}>
      {hotelCollection.map(hotel => (
        <HotelCard
          hotel={hotel}
          key={hotel.id}
          navigateToEditHotel={navigateToEditHotel}
        />
      ))}
    </div>
  );
};
