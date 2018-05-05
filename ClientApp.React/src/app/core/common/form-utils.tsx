import * as React from 'react';
import {TextField} from '@core/mui-exports';
import {FieldRenderProps} from 'react-final-form';

// material-ui wrappers. Check https://github.com/final-form/react-final-form#material-ui-10 for more details

/**
 * Wraps material-ui TextField in finalf-form field
 */
export const FormTextField = (props: FieldRenderProps) => {

  const {
    input: {name, onChange, value, ...restInput}, meta, ...rest
  } = props;

  return (
    <TextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );
}

// Validators
export const validatorRequired = (value: any) => (value ? undefined : "Required");
