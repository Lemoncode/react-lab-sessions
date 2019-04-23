import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextFieldForm, DropdownForm, TextAreaForm } from 'common/components';
import { TextField, Button } from '@material-ui/core';
import Rating from 'material-ui-rating';
import { HotelEntityVm } from './hotel-edit.vm';
import { LookupEntity } from 'core';
import { RatingForm } from 'common/components';

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
  onFieldUpdate : (id : string, value: any) => void;
}
  

export const HotelEditComponentInner = (props : Props) => {
  const {classes, hotel, cities, onFieldUpdate} = props;

  return (
    <div className={classes.formContainer}>
        <TextFieldForm
          label="Name"
          name="name"
          value={hotel.name}
          onChange={onFieldUpdate}
        /> 

        <img className={classes.picture} src={hotel.picture}/>

        <RatingForm 
          name="rating"
          value={hotel.rating}
          max={5}
          onChange={onFieldUpdate}
        />

        <DropdownForm
          name="city"
          label="city"
          onChange={onFieldUpdate}
          value={hotel.city}
          list={cities}
        />


        <TextAreaForm
          placeholder="Description"
          name="description"
          label="description"
          value={hotel.description}
          onChange={onFieldUpdate}
        />

        <Button  variant="contained" color="primary">Save</Button>

    </div>
  );
}

export const HotelEditComponent = withStyles(styles)(HotelEditComponentInner);