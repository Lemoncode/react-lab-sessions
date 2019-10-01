# 05 Validation

In this example we are going to add inline form validation to our Login Form.

We will take a startup point sample _04-form_.

Summary steps:

- Install @lemoncode/fonk
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

- Let's install _fonk_

```bash
npm install @lemoncode/fonk --save
```

- Now let's define a basic validation for the form, we want to ensure both fields are informed.

  - We are going to make use of _fonk_.
  - This library allow us to define form validation in a declarative way.
  - We can add field and global level validations.
  - Support syn andc async validations.
  - It ships some built in validations, you can find third parties that have built
    validations and you can build your own custom validations.

_./src/pods/login/login.validation.ts_

```typescript
import { Validators, createFormValidation } from "@lemoncode/fonk";

const validationSchema = {
  field: {
    login: [Validators.required.validator],
    password: [Validators.required.validator]
  }
};

export const formValidation = createFormValidation(validationSchema);
```

- Now that we have all the plumbing is time to jump into the UI side.

- Let's add fonk integration into our form errors.

_./src/pods/login/login.component.ts_

```typescript
import { formValidation } from "./login.validation";
```

_./src/pods/login/login.component.ts_

```diff
  <form onSubmit={handleSubmit} noValidate>
    <Field
      fullWidth
      name="login"
      component={TextField}
      type="text"
      label="Name"
+     validate={(value, _, meta) =>
+              formValidation.validateField(meta.name, value)
+            }
    />
    <Field
      fullWidth
      name="password"
      component={TextField}
      type="password"
      label="Password"
+     validate={(value, _, meta) =>
+              formValidation.validateField(meta.name, value)
+            }
    />
```

- Let's run the example.

```bash
npm start
```

- Nice if we enter info on a field, clean it up and jump to another field we get inline error messages,
  BUT we want to execute all the validations when we click on the login button, let's do that

_./src/pods/login/login.component.ts_

```diff
        <Form
          onSubmit={values => onLogin(values)}
          initialValues={initialLoginInfo}
+         validate={values =>
+              formValidation
+                .validateForm(values)
+                .then(({ fieldErrors }) => fieldErrors)
+            }
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
```

- Now try to directly click on the login button, what happened?
  **Login button is not working** Why is happenning this? Because Fonk
  provide rich context error information, in case of success React
  Final Form expects a null or undefined entry. Let's create
  an adaptor for Final Form (in the future this adaptor will be published).

_./src/common/utils/final-form-adapter.ts_

```typescript
import { ValidationResult, FormValidationResult } from "@lemoncode/fonk";

// TODO: in future releases we will create
// a separate microlibrary called: fonk-final-form
// will include a createValidationFinalForm, that will
// implement a ValidationForm class including the
// final form expected behavior.
// TODO export FormValidation in fonk.d.ts
// import {FormValidation} from '@lemoncode/fonk'
// formValidation : FormValidation
// Add error handling
export const validateField = (
  formValidation,
  fieldId: string,
  value: any,
  values?: any
): Promise<ValidationResult> => {
  return new Promise<ValidationResult>(resolve => {
    formValidation.validateField(fieldId, value, values).then(result => {
      if (!result || result.succeeded === true) {
        resolve(null);
      } else {
        resolve(result);
      }
    });
  });
};

export const validateForm = (
  formValidation,
  values
): Promise<FormValidationResult> =>
  formValidation
    .validateForm(values)
    .then(({ succeeded, fieldErrors }) => (succeeded ? null : fieldErrors));
```

- Let's create a barrel.

_./src/common/utils/index.ts_

```typescript
export * from "./final-form-adapter";
```

- Now let's update the validation in the form.

Let's add the import to the file.

_./src/pods/login/login.component.tsx_

```diff
import { TextField } from "common/components/forms";
import { formValidation } from "./login.validation";
+ import {validateField, validateForm} from 'common/utils/'
```

First on the form

_./src/pods/login/login.component.tsx_

```diff
        <Form
          onSubmit={values => onLogin(values)}
          initialValues={initialLoginInfo}
          validate={values =>
+             validateForm(formValidation, values)
-            formValidation
-              .validateForm(values)
-              .then(({ fieldErrors }) => fieldErrors)
          }
```

The on the fields

_./src/pods/login/login.component.tsx_

```diff
                <Field
                  fullWidth
                  name="login"
                  component={TextField}
                  type="text"
                  label="Name"
                  validate={(value, _, meta) =>
+                    validateField(formValidation, meta.name, value)
-                    formValidation.validateField(meta.name, value)
                  }
                />

                <Field
                  fullWidth
                  name="password"
                  component={TextField}
                  type="password"
                  label="Password"
                  validate={(value, _, meta) =>
+                    validateField(formValidation, meta.name, value)
-                    formValidation.validateField(meta.name, value)
                  }
                />
```

> Excercise taking a look to this code, in the validateField we are repeating an inline
> function (it would be for every field), can we extract this to a component function?

> Excercise display a message when clicking on submit and there are form validation errors.

# Excercises

## Exercise 1

- Check if it's needed to pimp a bit the layout (min-height on the card).

## Excercise 2:

Implement a validation on login, it should have at least 3 characters lenght (built in validation).

Implement a NIF or another kind of custom validation for the login field.
