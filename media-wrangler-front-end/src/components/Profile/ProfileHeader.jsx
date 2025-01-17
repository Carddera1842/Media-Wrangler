import React, { useState } from "react";
import { useAuth } from "../../Services/AuthContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Typography, Button } from "@mui/material";

export default function LetterAvatars({ user }) {
  const { updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,  
    email: user.email,
    username: user.username,
    bio: user.bio || "", 
  });

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving profile with data:", formData);
      await updateProfile(formData);
      console.log("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error.message);
      alert("Failed to update profile.");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        p: 2,
        border: "1px solid grey",
        width: "50%",
        margin: "0 auto",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "100%" }}>
        <Avatar>{getInitials(user.firstname + " " + user.lastname)}</Avatar>

        {isEditing ? (
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Add a short bio"
              rows={3}
              style={{
                resize: "none",
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="text" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Stack>
        ) : (
          <Stack sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{user.username}</Typography>
            <Typography>{`${user.firstname} ${user.lastname}`}</Typography>
            <Typography>{user.email}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>{user.bio || "No bio available"}</Typography>
          </Stack>
        )}

        {!isEditing && (
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </Stack>
    </Box>
  );
}
