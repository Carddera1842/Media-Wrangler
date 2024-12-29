import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
// import { deepOrange, deepPurple } from '@mui/material/colors';

export default function LetterAvatars({ user }) {
  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <Box component="section" sx={{ p: 2, border: '1px solid grey'}}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar>{getInitials(user.firstname + " " + user.lastname)}</Avatar>
        <h1>{user.username}</h1>
      </Stack>
    </Box>
  );
}
