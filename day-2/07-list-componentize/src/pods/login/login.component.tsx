import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { LoginEntity as LoginEntityVm, LoginFormErrors } from "./login.vm";
import { TextFieldForm } from "common/components";

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
  credentials: LoginEntityVm;
  onUpdateCredentials: (name: keyof LoginEntityVm, value: string) => void;
  loginFormErrors: LoginFormErrors;
}

export const LoginComponentInner = (props: Props) => {
  const {
    classes,
    onLogin,
    credentials,
    onUpdateCredentials,
    loginFormErrors
  } = props;

  const onTexFieldChange = (fieldId: keyof LoginEntityVm) => e => {
    onUpdateCredentials(fieldId, e.target.value);
  };

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <div className={classes.formContainer}>
            <TextFieldForm
              label="Name"
              name="login"
              value={credentials.login}
              onChange={onUpdateCredentials}
              error={loginFormErrors.login.errorMessage}
            />
            <TextFieldForm
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={onUpdateCredentials}
              error={loginFormErrors.password.errorMessage}
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
