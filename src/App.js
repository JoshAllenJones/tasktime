import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card  } from 'react-bootstrap';
import SideNav from './SideNav/SideNav';
import initialData from "./initial-data";

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react





const App = () => {
    const [taskData, setTaskData] = useState(initialData)
    console.log(taskData)
    const tasks = taskData.tasks


    return (
        <Container>
            <div>
                {tasks.map((task) => (
                    <Card id={task.id}>{task.content}</Card>
                ))
                }
            </div>
        </Container>




  )


}

export default App;