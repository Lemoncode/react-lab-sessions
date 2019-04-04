import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { LoginEntity } from "./login.vm";

const styles = theme =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {
  onLogin: () => void;
  credentials: LoginEntity;
  onUpdateCredentials: (name: keyof LoginEntity, value: string) => void;
}

export const LoginComponentInner = (props: Props) => {
  const { classes, onLogin, credentials, onUpdateCredentials } = props;

  const onTexFieldChange = (fieldId: keyof LoginEntity) => e => {
    onUpdateCredentials(fieldId, e.target.value);
  };

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <div className={classes.formContainer}>
            <TextField
              label="Name"
              margin="normal"
              value={credentials.login}
              onChange={onTexFieldChange("login")}
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={onTexFieldChange('password')}
            />
            <Button variant="contained" color="primary" onClick={onLogin}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export const LoginComponent = withStyles(styles)(LoginComponentInner);
