import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import { LookupEntity } from "core/model";
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  name: string;
  label: string;
  onChange: any;
  value: string;
  error?: string;
  type?: string;
  select?: boolean;
  list? : LookupEntity[];
  isDisabled?: boolean;
}


const onTextFieldChange = (
  fieldId: string,
  onChange: (fieldId, value) => void
) => e => {
  onChange(fieldId, e.target.value);
};

export const DropdownForm: React.SFC<Props> = props => {
  const { name, label, onChange, value, error, type, select, list, isDisabled } = props;
  return (
    <>
      <TextField
        label={label}
        margin="normal"
        value={value}
        type={type}
        select={select}
        onChange= {onTextFieldChange(name, onChange)}
        disabled={isDisabled}
      >
        {
          select ? list.map(
            collection =>
              <MenuItem key={collection.id} value={collection.value}>
              {collection.value}
            </MenuItem>
          ) : ""}
      </TextField>
      <Typography variant="caption" color="error" gutterBottom>
        {error}
      </Typography>
    </>
  );
};

DropdownForm.defaultProps = {
  type: "text",
  isDisabled: false,
};
