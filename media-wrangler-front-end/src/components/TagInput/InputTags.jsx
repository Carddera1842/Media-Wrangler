import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

/* 

 NOTE: It now allows users to create their own tags... I just need to incorporate it into the styled tag input we currently have

 NOTE: I believe that I can still use the map method and provide some predefined tags to the user as well. 
         If we wanted to add some cowboy slang tags we could provide those, or... maybe we could take the tags
         that users have already created and populate a tagsList for the users to access as well as create their own

         options={[]} : we can make predefined tags
         freeSolo : is allowing user to create their own tags

*/


//onTagsChange is passed down to the child TagInput
//TODO: Add prop validation for onTagsChange
export default function TagInput({ onTagsChange }) {
  const [tags, setTags] = useState([]); 

  //function is triggered, and the inputs are trimmed of whitespaces, updated local tags state and then the trimmed tags are passed to the parent component (AwardMovieReview) and sets them.
  const handleTagsChange = (event, newTags) => {
    const trimmedTags = newTags.map(tag => tag.trim());
    setTags(trimmedTags);
    onTagsChange(trimmedTags);
};

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-free-solo"
        options={[]} 
        freeSolo 
        value={tags} 
        onChange={handleTagsChange} 
        renderInput={(params) => (
          <TextField
            {...params}
            label="Custom Tags"
            placeholder="Add tags"
          />
        )}
      />
      <div>
{/* This is just to display what is happening, it can go or be styled differently */}
        <h4>Current Tags:</h4>
        <p>{tags.join(", ")}</p> 
      </div>
    </Stack>
  );
}
