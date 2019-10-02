import * as React from "react";
import { makeStyles, Button, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import { TextField } from "common/components/forms";
import { HotelEntityVm } from "pods/hotel-collection/hotel-collection.vm";
import { LookupEntity } from "core/model";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  picture: {
    maxWidth: "31.25rem"
  }
}));

interface Props {
  initialHotel: HotelEntityVm;
  cities: LookupEntity[];
}

export const HotelEditComponent = (props: Props) => {
  const { initialHotel, cities } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.formContainer}>
      <Form
        onSubmit={values => console.log(values)}
        initialValues={initialHotel}
        render={({ handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Field
              fullWidth
              name="name"
              component={TextField}
              type="text"
              label="Name"
            />

            <img className={classes.picture} src={values.picture} />

            <Typography component="legend">Controlled</Typography>

            <Rating
              name="simple-controlled"
              value={values.rating}
              onChange={(event, newValue) => {
                console.log("ratring update request");
              }}
            />

            <Button variant="contained" color="primary">
              Save
            </Button>
          </form>
        )}
      />
    </div>
  );
};

/*
{
      <img className={classes.picture} src={} />

      <TextField name="rating" value="rating" />

      <TextField label="City" name="city" value="city" />

      <TextField label="Description" name="description" value="description" />
  }

*/
