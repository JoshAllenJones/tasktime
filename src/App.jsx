import { useState, useEffect  } from "react";
import { Navbar, Grid, NavLink, Card, Transition } from "@mantine/core";

import { useRecoilState, useRecoilValue } from "recoil";
import { projectListAtom } from "./atoms/projectListAtom";
import { dailyNoteAtom } from "./atoms/dailyNoteAtom";
import { taskListAtom } from "./atoms/taskListAtom";
import { currentlyViewingAtom } from "./atoms/currentlyViewingAtom";
import './components/SideSheet/sidesheet.css'

import MainSheet from "./components/MainSheet/MainSheet";
import SideSheet from "./components/SideSheet/SideSheet";
import axios from 'axios'


//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

const App = () => {

  const [projectList, setProjectList] = useRecoilState(projectListAtom)
  const [dailyNote, setDailyNote] = useRecoilState(dailyNoteAtom)
  const currentlyViewing = useRecoilValue(currentlyViewingAtom)
  

  useEffect(() => {
    axios.get('/init').then((resp) => {
      console.log('WHAT IS THIS OBJECT')
      
      setProjectList((current) => [current, ...resp.data.init_obj.projects])
      setDailyNote(({...resp.data.init_obj.daily_note}))
      console.log('DAILY NOTE')
      console.log(dailyNote)
    })
  }, [setProjectList])


  const LinkList = () => projectList.map((item, i) => <NavLink key={item.project_id} label={item.project_name} />)

  function SidePanel(){
    if (Object.keys(currentlyViewing).length > 0){
      return (
        <Grid.Col span={6} className="slide-in-right">
          <SideSheet taskObj={currentlyViewing} />
        </Grid.Col>
      )
    } else {
      return null
    }
  }
  
  

  return (
    
    
    <Grid sx={{ "backgroundColor": "#3680ff" }} >
      <Grid.Col span={2}>
          <Navbar>
            <LinkList />
          </Navbar>
      </Grid.Col>
      <Grid.Col  span={10}>
        <Grid justify={"center"}>
          <Grid.Col span={6}>
            <MainSheet sheetTitle={dailyNote.date} />
          </Grid.Col>          
          <SidePanel />
        </Grid>
      </Grid.Col>
    </Grid>
    
  );
};

export default App;
