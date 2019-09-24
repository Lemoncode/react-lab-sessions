import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

interface Props {}

export const LoginComponent = (props: Props) => {
  const classes = useStyles(props);

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <div className={classes.formContainer}>
          <TextField label="Name" margin="normal" />
          <TextField label="Password" type="password" margin="normal" />
          <Button variant="contained" color="primary">
            Login
          </Button>
        </div>
      </Card>
    </>
  );
};
