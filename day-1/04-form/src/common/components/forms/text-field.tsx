import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import TextFieldMui from "@material-ui/core/TextField";

export const TextField: React.SFC<FieldRenderProps<any, any>> = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextFieldMui
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );
};
