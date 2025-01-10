import * as React from 'react';
import { teal } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

export default function ColorRadioButtons({ name, value, checked, onChange }) {
    return (
      <Radio
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        sx={{
          color: teal[800],
          '&.Mui-checked': {
            color: teal[300],
          },
        }}
      />
    );
  }
