import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';

function MovieDetailsNav() {

    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };



    //Need to provide the tabs with data to display... will make dynamic once merged with API branch
    const tabData = {
        one: "Cast details go here",
        two: "Crew details go here",
        three: "Movie details go here",
        four: "Release dates go here",
        five: "Genres go here"
    };

  
    return (
        <>
        <Box 
            sx={{
            width: "500px",
            background: "#004d40", 
            padding: '10px', 
            borderRadius: '4px', 
            margin: "auto",
            marginBottom: "30px",
            border: "2px solid white"
            }} >
        <Tabs
          value={ value }
          onChange={ handleChange }
          textColor="white"
          indicatorColor="primary"       
        >
          <Tab value="one" label="Cast" />
          <Tab value="two" label="Crew" />
          <Tab value="three" label="Details" />
          <Tab value="four" label="Releases" />
          <Tab value="five" label="Genres" />
        </Tabs>
        <Card 
            sx={{
            width: "450px",
            margin: "10px auto",
            border: "2px solid #ff8f00",
            background: "rgb(41, 43, 45)",
            padding: "10px"
            }} >
            <Typography variant="body2" color="white">
                { tabData[value] }
            </Typography>            
        </Card>
      </Box>    
      </>
    );
}

export default MovieDetailsNav;

