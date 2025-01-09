import { Box } from "@mui/material";
import TextField from "@mui/material";

export default function InputTags() {

    return (
      <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            variant='standard'
            size='small'
            sx={{ margin: "1rem 0" }}
            margin='none'
            placeholder="Enter tags here"
          />
  
      </Box>
    );
  }
  
