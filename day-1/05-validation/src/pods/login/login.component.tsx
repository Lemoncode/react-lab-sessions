import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "common/components/forms";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { LoginEntityVm } from "./login.vm";
import { formValidation } from "./login.validation";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

interface Props {
  onLogin: (loginInfo: LoginEntityVm) => void;
  initialLoginInfo: LoginEntityVm;
}

export const LoginComponent = (props: Props) => {
  const classes = useStyles(props);
  const { onLogin, initialLoginInfo } = props;

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <div className={classes.formContainer}>
          <Form
            onSubmit={values => onLogin(values)}
            validate={values =>
              formValidation
                .validateForm(values)
                .then(({ fieldErrors }) => fieldErrors)
            }
            initialValues={initialLoginInfo}
            render={({ handleSubmit, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Field
                  fullWidth
                  name="login"
                  component={TextField}
                  type="text"
                  label="Name"
                  validate={(value, _, meta) =>
                    formValidation.validateField(meta.name, value)
                  }
                />
                <Field
                  fullWidth
                  name="password"
                  component={TextField}
                  type="password"
                  label="Password"
                  validate={(value, _, meta) =>
                    formValidation.validateField(meta.name, value)
                  }
                />
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
                <pre>{JSON.stringify(values, undefined, 2)}</pre>
                <Field name="login">
                  {props => <pre>{JSON.stringify(props, undefined, 2)}</pre>}
                </Field>
              </form>
            )}
          />
        </div>
      </Card>
    </>
  );
};
