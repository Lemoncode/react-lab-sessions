# 05 Validation

In this example we are going to add inline form validation to our Login Form.

We will take a startup point sample _04-form_.

Summary steps:

- Install lc-form-validation
- Define the validations.
- Create a common wrapper for the textField.
- Use the wrapper on login form.
- Check inline errors.
- Validate on form and display field errors.
- Exercise refactor login form to follow SRP.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v8.x.x and npm 5.x.x by running `node -v` and `npm -v`
> in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content of the `04-form` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Let's install _lc-form-validation_

```bash
npm install lc-form-validation --save
```

- To avoid having too much repeated code let's move to common an input component, including it's label plus validation text.

_./src/common/components/text-field-form.component.tsx_

```tsx
import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography/Typography";

interface Props {
  name: string;
  label: string;
  onChange: any;
  value: string;
  error?: string;
  type?: string;
}

const defaultProps: Partial<Props> = {
  type: "text"
};

const onTextFieldChange = (
  fieldId: string,
  onChange: (fieldId, value) => void
) => e => {
  onChange(fieldId, e.target.value);
};

export const TextFieldForm: React.StatelessComponent<Props> = props => {
  const { name, label, onChange, value, error, type } = props;
  return (
    <>
      <TextField
        label={label}
        margin="normal"
        value={value}
        type={type}
        onChange={onTextFieldChange(name, onChange)}
      />
      <Typography variant="caption" color="error" gutterBottom>
        {props.error}
      </Typography>
    </>
  );
};
```

- Let's create an index file.

_,/src/common/components/index.ts_

```typescript
export * from "./text-field-form.component";
```

- Let's add _common_ as an alias.

_./webpack.config.js_

```diff
    alias: {
      // Later on we will add more aliases here
      layout: path.resolve(__dirname, "./src/layout/"),
      scenes: path.resolve(__dirname, "./src/scenes/"),
      core: path.resolve(__dirname, "./src/core/"),
      pods: path.resolve(__dirname, "./src/pods/"),
+     common: path.resolve(__dirname, "./src/common/"),
    }
```

_./tsconfig.json_

```diff
    "paths": {
      "@layout": ["./layout/*"],
      "@scenes": ["./scenes/*"],
      "@core": ["./core/*"],
      "@pods": ["./pods/*"],
+      "@common": ["./common/*"]
    }
```

- Now let's define a basic validation for the form, we want to ensure both fields are informed.

  - We are going to make use of lc-form-validation.
  - This library allow us to define form validation in a declarative way.
  - We can add field and global level validations.
  - Support syn and async validations.
  - It ships some built in validations, you can find third parties that have built
    validations and you can build your own custom validations.

_./src/pods/login/login.validation.ts_

```typescript
import {
  createFormValidation,
  ValidationConstraints,
  Validators
} from "lc-form-validation";

const loginFormValidationConstraints: ValidationConstraints = {
  fields: {
    login: [{ validator: Validators.required }],
    password: [{ validator: Validators.required }]
  }
};

export const loginFormValidation = createFormValidation(
  loginFormValidationConstraints
);
```

- Let's create now a class to hold the dataFormErrors.

_./src/pods/login/login.vm.ts_

```diff
+ import { FieldValidationResult } from "lc-form-validation";

// (...)

export const createEmptyLogin = (): LoginEntity => ({
  login: "",
  password: ""
});

+ export interface LoginFormErrors {
+  login: FieldValidationResult;
+  password: FieldValidationResult;
+ }
+
+ export const createDefaultLoginFormErrors = (): LoginFormErrors => ({
+  login: new FieldValidationResult(),
+  password: new FieldValidationResult()
+ });
```

- Now that we have all the plumbing is time to jump into the UI side.

- Let's add the data form errors.

_./src/pods/login/login.container.ts_

```diff
import { LoginEntity, createEmptyLogin } from "./login.vm";
import { validateCredentials } from "./api";
- import { LoginEntity, createEmptyLogin } from "./login.vm";

+ import { LoginEntity, createEmptyLogin, LoginFormErrors, createDefaultLoginFormErrors } from "./login.vm";
```

```diff
export const LoginContainerInner = (props: Props) => {
+ const [loginFormErrors, setLoginFormErrors] = React.useState<LoginFormErrors>(createDefaultLoginFormErrors());
  const [credentials, setCredentials] = React.useState<LoginEntity>(
    createEmptyLogin()
  );
  const { history } = props;
```

- Let's fire the validation on viemodel update.

_./src/pods/login.container.tsx_

```diff
+ import { loginFormValidation } from "./loginPage.validation";
```

```diff
  const onUpdateCredentialsField = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    });

+    loginFormValidation.validateField(credentials, name, value)
+    .then((fieldValidationResult) => {
+        setLoginFormErrors({
+          ...loginFormErrors,
+          [name]: fieldValidationResult,
+        });
+   });
  };
```

- Let's pass the _loginFormErrors_ to the login component.

_./src/pods/login.container.tsx_

```diff
  return (
    <LoginComponent
      onLogin={doLogin}
      credentials={credentials}
      onUpdateCredentials={onUpdateCredentialsField}
+      loginFormErrors={loginFormErrors}
    />
  );
```

- We have got the container ready, let's jump into the component side.

We will start by adding _loginFormErrors_ to the component props.

_./src/pods/login.component.tsx_

```diff
interface Props extends WithStyles<typeof styles> {
  onLogin: () => void;
  credentials: LoginEntityVm;
  onUpdateCredentials: (name: keyof LoginEntityVm, value: string) => void;
+ loginFormErrors: LoginFormErrors;
}
```

- Now let's replace the TextField we were using with our new TextFieldform wrapper
  (adds validation error information).

_./src/pods/login.component.tsx_

```diff
+ import { TextFieldForm } from 'common/components';
```

- Let's replace the TextFieldForm entries with the wrapper we have created (includes displaying validation errors).

_./src/pods/login.component.tsx_

```diff
export const LoginComponentInner = (props: Props) => {
  const { classes,
          onLogin,
          credentials,
          onUpdateCredentials,
+          loginFormErrors
         } = props;
```

The wrapper that we are going to include alreadty implements an OnChange wrapper.

```diff
-  const onTexFieldChange = (fieldId: keyof LoginEntityVm) => e => {
-    onUpdateCredentials(fieldId, e.target.value);
-  };

```

```diff
-            <TextField
+            <TextFieldForm
              label="Name"
-              margin="normal"
              value={credentials.login}
+             name="login"
-              onChange={onTexFieldChange("login")}
+             onChange={onUpdateCredentials}
+             error={loginFormErrors.login.errorMessage}
            />
-            <TextField
+            <TextFieldForm
              label="Password"
              type="password"
+             name="password"
-              margin="normal"
              value={credentials.password}
-              onChange={onTexFieldChange('password')}
+        onChange={onUpdateCredentials}
+        error={loginFormErrors.password.errorMessage}
            />
```

- Let's give a try:

```bash
npm start
```

- And let's add an alert (Excercise and a notification) when the user clicks and the form all the fields are valid.

_./src/pods/login.container.tsx_

```diff
  const doLogin = () => {
+    loginFormValidation.validateForm(credentials).then(formValidationResult => {
+      if (formValidationResult.succeeded) {
        validateCredentials(credentials.login, credentials.password).then(
          areValidCredentials => {
            areValidCredentials
              ? history.push(routesLinks.hotelCollection)
              : alert(
                  "invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert."
                );
          }
        );
+      } else {
+        alert("error, review the fields");
+        const updatedLoginFormErrors = {
+          ...loginFormErrors,
+          ...formValidationResult.fieldErrors
+        };
+        setLoginFormErrors(updatedLoginFormErrors);
+      }
+    });
  };
```

# Excercises

## Exercise 1

- Refactor onLogin it doesn't follow SRP.

## Exercise 2

- Check if it's needed to pimp a bit the layout (min-height on the card).

## Excercise 3:

Implement a validation on login, it should have at least 3 characters lenght (built in validation).

Implement a NIF or another kind of custom validation for the login field.
