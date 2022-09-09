import { useState, useEffect  } from "react";
import { Navbar, Grid, NavLink, Card } from "@mantine/core";
import MainSheet from "./components/MainSheet/MainSheet";



//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

const App = () => {


  return (
    
    
    <Grid sx={{ "backgroundColor": "#d8dfeb" }} >
      <Grid.Col span={2}>
          <Navbar>
            <NavLink label="Some Kind of Thing" />
          </Navbar>
      </Grid.Col>
      <Grid.Col  span={10}>
        <Grid justify={"center"}>
          <Grid.Col span={6}>
            <MainSheet />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
    
  );
};

export default App;
