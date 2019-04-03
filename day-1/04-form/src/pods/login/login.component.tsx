import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {}

export const LoginComponentInner = (props: Props) => {
  const { classes } = props;

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <div className={classes.formContainer}>
            <TextField label="Name" margin="normal" />
            <TextField label="Password" type="password" margin="normal" />
            <Button variant="contained" color="primary">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export const LoginComponent = withStyles(styles)(LoginComponentInner);
