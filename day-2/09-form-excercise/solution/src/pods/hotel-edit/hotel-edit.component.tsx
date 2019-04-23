import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextFieldForm, DropdownForm } from 'common/components';
import { TextField, Button } from '@material-ui/core';
import Rating from 'material-ui-rating'
import { HotelEntityVm } from './hotel-edit.vm';
import { LookupEntity } from 'core';

const styles = (theme : Theme) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    picture: {
      maxWidth: "31.25rem"
    }
  });

interface Props extends WithStyles<typeof styles> {
  hotel : HotelEntityVm;
  cities : LookupEntity[];
}
  

export const HotelEditComponentInner = (props : Props) => {
  const {classes, hotel, cities} = props;

  return (
    <div className={classes.formContainer}>
        <TextFieldForm
          label="Name"
          name="login"
          value={hotel.name}
          onChange={() => console.log('') }
        /> 

        <img className={classes.picture} src={hotel.picture}/>

        <Rating 
          value={hotel.rating}
          max={5}
          onChange={(value) => console.log(`rated with value: ${value}`)}
        />

        <DropdownForm
          name="city"
          label="city"
          onChange="() => console.log('')"
          value={hotel.city}
          list={cities}
        />


        <TextField
          placeholder="Description"
          value={hotel.description}
          multiline={true}
          rows={3}
          rowsMax={4}
        />

        <Button  variant="contained" color="primary">Save</Button>

    </div>
  );
}

export const HotelEditComponent = withStyles(styles)(HotelEditComponentInner);