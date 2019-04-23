import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import { placeholder } from "@babel/types";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  onChange: (id : string, value : any) => void;
  value: string;
  error?: string;
  rows? : number;
  rowsMax?: number;
}

const onTextFieldChange = (fieldId: string, onChange: (fieldId, value) => void) => e => {
  onChange(fieldId, e.target.value);
};

export const TextAreaForm: React.StatelessComponent<Props> = props => {
  const { name, label, onChange, value, error, rows, rowsMax, placeholder } = props;
  return (
    <>
      <TextField
        placeholder={placeholder}
        label={label}
        margin="normal"
        value={value}
        type="text"
        multiline={true}
        rows={rows}
        rowsMax={rowsMax}
        onChange={onTextFieldChange(name, onChange)}       
      />
      <Typography variant="caption" color="error" gutterBottom>
        {props.error}
      </Typography>
    </>
  );
};

TextAreaForm.defaultProps = {
  rows: 3,
  rowsMax: 5,
}
