import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Services/AuthContext.jsx'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutAction } = useAuth();

  const [value, setValue] = React.useState(0);

  const tabRoutes = user
  ? ['/', '/movies', '/search', `/profile/${user.id}`, '/logout']
  : ['/', '/movies', '/search', '/login', '/register'];

  React.useEffect(() => {
    const currentTab = tabRoutes.indexOf(location.pathname);
    if (currentTab !== -1) {
      setValue(currentTab);
    } else {
      setValue(-1);
    }
  }, [location.pathname, tabRoutes]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = async () => {
    try {
      await logoutAction();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          <Tab label="Home" component={Link} to="/" sx={{ marginX: 3 }} />
          <Tab label="Movies" component={Link} to="/movies" sx={{ marginX: 3 }} />
          <Tab label="Search" component={Link} to="/search" sx={{ marginX: 3 }} />

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
                to={user ? `/profile/${user.id}` : '/login'} 
                sx={{ marginX: 3}} 
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