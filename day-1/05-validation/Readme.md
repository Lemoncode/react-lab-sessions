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
import { formValidation } from "./login.validation.ts";
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

- Now try to directly click on the login button.

> Excercise display a message when this happens.

# Excercises

## Exercise 1

- Check if it's needed to pimp a bit the layout (min-height on the card).

## Excercise 2:

Implement a validation on login, it should have at least 3 characters lenght (built in validation).

Implement a NIF or another kind of custom validation for the login field.
