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

// *** WIP