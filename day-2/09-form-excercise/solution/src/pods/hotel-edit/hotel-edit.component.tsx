import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextFieldForm, DropdownForm } from 'common/components';
import { TextField } from '@material-ui/core';
import Rating from 'material-ui-rating'
import { HotelEntityVm } from './hotel-edit.vm';

const styles = (theme : Theme) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {
  hotel : HotelEntityVm;
}
  

export const HotelEditComponentInner = (props : Props) => {
  const {classes, hotel} = props;

  return (
    <div className={classes.formContainer}>
        <TextFieldForm
          label="Name"
          name="login"
          value={hotel.name}
          onChange={() => console.log('') }
        /> 

        <img src={hotel.picture}/>

        <Rating 
          value={hotel.rating}
          max={5}
          onChange={(value) => console.log(`rated with value: ${value}`)}
        />

        <DropdownForm
          name=""
          label="city"
          onChange="() => console.log('')"
          value=''
          list={[]}
        />


        <TextField
          placeholder="Description"
          value={hotel.description}
          multiline={true}
          rows={3}
          rowsMax={4}
        />

    </div>
  );
}

export const HotelEditComponent = withStyles(styles)(HotelEditComponentInner);