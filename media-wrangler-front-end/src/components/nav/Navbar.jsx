import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext.jsx';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutAction } = useAuth();

  const [value, setValue] = React.useState(0);

  const tabRoutes = user
    ? ['/', '/discover', '/search', '/discussions', `/profile/${user.id}`, '/logout']
    : ['/', '/discover', '/search', '/discussions', '/login', '/register'];

  const getTabValue = (pathname) => {
    const cleanPath = tabRoutes.find((route) => pathname.startsWith(route));
    return cleanPath ? tabRoutes.indexOf(cleanPath) : 0;
  };

  React.useLayoutEffect(() => {
    console.log('tabRoutes:', tabRoutes);
    console.log('location.pathname:', location.pathname);
    setValue(getTabValue(location.pathname));
  }, [location.pathname, tabRoutes]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = async () => {
    try {
      await logoutAction();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        bgcolor: 'background.paper',
        padding: 2,
        flexWrap: 'nowrap',
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          fontSize: { xs: 24, sm: 36 },
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          textAlign: { xs: 'center', sm: 'left' },
          flexShrink: 0,
          marginRight: 2,
        }}
      >
        Media Wrangler
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0,
          bgcolor: 'background.paper',
          padding: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Home" component={Link} to="/" sx={{ marginX: 3 }} />
          <Tab label="Discover" component={Link} to="/discover" sx={{ marginX: 3 }} />
          <Tab label="Search" component={Link} to="/search" sx={{ marginX: 3 }} />
          <Tab label="Discussions" component={Link} to="/discussions" sx={{ marginX: 3 }} />

          {!user ? (
            <>
              <Tab label="Log In" component={Link} to="/login" sx={{ marginX: 3 }} />
              <Tab label="Register" component={Link} to="/register" sx={{ marginX: 3 }} />
            </>
          ) : (
            <>
              <Tab
                label="Profile"
                component={Link}
                to={`/profile/${user.id}`}
                sx={{ marginX: 3 }}
              />
              <Tab
                label="Log out"
                onClick={handleSignOut}
                sx={{ marginX: 3, cursor: 'pointer' }}
              />
            </>
          )}
        </Tabs>
      </Box>
    </Box>
  );
}
