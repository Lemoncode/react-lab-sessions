import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { HotelEntityVm } from "./hotel-collection.vm";
import { HotelCard } from "./components/hotel-card.component"; // on next step we will create this component

interface Props extends WithStyles<typeof styles> {  
  hotelCollection: HotelEntityVm[];
}

const styles = theme => createStyles({
    listLayout: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    }
  });

export const HotelCollectionComponentInner = (props: Props) => {
  const { hotelCollection, classes } = props;

  return (
    <div className={classes.listLayout}>
      {hotelCollection.map(hotel => (
        <HotelCard hotel={hotel} />
      ))}
    </div>
  );
};

export const HotelCollectionComponent = withStyles(styles)(
  HotelCollectionComponentInner
);
