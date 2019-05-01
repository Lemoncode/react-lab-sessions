import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography/Typography';

interface Props {
  name: string;
  label: string;
  onChange: (field: string, value) => void;
  value: string;
  error?: string;
  type?: string;
  onBlur?: (field: string, value) => void;
}

const handleChange = (field: string, onChange) => e => {
  onChange(field, e.target.value);
};

const handleBlur = (field: string, onBlur) => e => {
  if (onBlur) {
    onBlur(field, e.target.value);
  }
};

export const TextFieldForm: React.StatelessComponent<Props> = ({
  name,
  label,
  onChange,
  value,
  error,
  type,
  onBlur,
}) => (
  <>
    <TextField
      label={label}
      margin="normal"
      value={value}
      type={type}
      onChange={handleChange(name, onChange)}
      onBlur={handleBlur(name, onBlur)}
    />
    <Typography variant="caption" color="error" gutterBottom={true}>
      {error}
    </Typography>
  </>
);

TextFieldForm.defaultProps = {
  type: 'text',
};
