import * as React from 'react';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  // React.useEffect(
  //   handleChange(0)
  // )[]
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'comumn', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        padding: 2
      }}>
        <Box sx={{ 
          fontSize: { xs: 24, sm: 36 }, 
          fontWeight: 'bold', 
          fontFamily: 'sans-serif', 
          textAlign: { sx: 'center', sm: 'left'},
          width: { xs: '100%', sm: 'auto'},
          }}>
          Media Wrangler
        </Box>
        <Box sx={{
          width: '50%',
          bgcolor: 'Background.paper',
          padding: 2
        }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" component={Link} to="/" sx={{ marginX: 3 }} />
          <Tab label="Movies" component={Link} to="/movies" sx={{ marginX: 3 }} />
          <Tab label="Search" component={Link} to="/search" sx={{ marginX: 3 }} />
          <Tab label="Log In" component={Link} to="/login" sx={{ marginX: 3 }} />
          <Tab label="Register" component={Link} to="/register" sx={{ marginX: 3 }} />
        </Tabs>
        </Box>
      </Box>
  );
}