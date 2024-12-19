import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        padding: 2
      }}>
        <Box sx={{ fontSize: 36, fontWeight: 'bold', fontFamily: 'sans-serif' }}>
          Media Wrangler
        </Box>
        <Box sx={{
          width: '50%',
          bgcolor: 'Background.paper',
          padding: 2
        }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" LinkComponent={"/"} sx={{ marginX: 3 }} />
          <Tab label="Movies" sx={{ marginX: 3 }} />
          <Tab label="Search" sx={{ marginX: 3 }} />
          <Tab label="Log In" sx={{ marginX: 3 }} />
          <Tab label="Register" sx={{ marginX: 3 }} />
        </Tabs>
        </Box>
      </Box>
  );
}