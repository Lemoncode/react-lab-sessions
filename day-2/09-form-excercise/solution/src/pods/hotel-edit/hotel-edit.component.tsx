import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextFieldForm, DropdownForm } from 'common/components';
import { TextField } from '@material-ui/core';


const styles = (theme : Theme) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {

}
  

export const HotelEditComponentInner = (props : Props) => {
  const {classes} = props;

  return (
    <div className={classes.formContainer}>
        <TextFieldForm
          label="Name"
          name="login"
          value={''}
          onChange={() => console.log('') }
        /> 

        <div>picture place holder</div>

        <TextField
          placeholder="Description"
          multiline={true}
          rows={3}
          rowsMax={4}
        />

        <DropdownForm
          name=""
          label="city"
          onChange="() => console.log('')"
          value=''
          list={[]}
        />

    </div>
  );
}

export const HotelEditComponent = withStyles(styles)(HotelEditComponentInner);