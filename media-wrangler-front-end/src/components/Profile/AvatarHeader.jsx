import React from 'react'
import { Avatar } from '@mui/material';
import { useAuth } from '../../Services/AuthContext';

function AvatarHeader({ firstname, lastname }) {

   const { user } = useAuth();

    const getInitials = (name) => {
        const names = name.split(" ");
        return names.map((n) => n[0]).join("").toUpperCase();
      };

  return (
    <div>
       <Avatar className="review-avatar">
          <span className="avatar-initials">
          {getInitials( firstname + " " + lastname)}
          </span>
          </Avatar>
    </div>
  )
}

export default AvatarHeader
