import * as React from "react";
import Rating from 'material-ui-rating';
import Typography from "@material-ui/core/Typography";

interface Props {
  name: string
  onChange: (id : string, value : any) => void;
  value: number;
  max: number;
  error?: string;
}

const onValueFieldChange = (fieldId: string,onChange: (fieldId, value) => void) => value => {
  onChange(fieldId, value);
};

export const RatingForm: React.StatelessComponent<Props> = props => {
  const { value, max, onChange, name } = props;
  return (
    <>
      <Rating
        value={value}
        max={max}
        onChange={onValueFieldChange(name, onChange)}
      />
      <Typography variant="caption" color="error" gutterBottom>
        {props.error}
      </Typography>
    </>
  );
};
