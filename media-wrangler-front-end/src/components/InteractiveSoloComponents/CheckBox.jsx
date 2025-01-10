import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Does review contain spoilers?' } };

export default function ColorCheckboxes({ name, value, checked, onChange }) {
  return (
    <div>
      <Checkbox
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        {...label}
        sx={{
          color: pink[800], // Default color for the checkbox
          '&.Mui-checked': {
            color: pink[600], // Checked color
          },
          '& .MuiSvgIcon-root': {
            fontSize: 28, // Custom font size for the icon
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 20, 147, 0.1)', // Custom hover background
          },
          '&.Mui-focusVisible': {
            outline: '2px solid rgba(255, 20, 147, 0.5)', // Custom focus outline
          },
          '& .MuiSvgIcon-root:hover': {
            stroke: 'pink', // Custom stroke outline on hover
            strokeWidth: '1px',
          },
        }}
      />
    </div>
  );
}
