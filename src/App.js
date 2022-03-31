import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Stack} from 'react-bootstrap';
import SideNav from './SideNav/SideNav';
import initialData from "./initial-data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react


const TaskCard = (props) => {
    return(
        <Card id={props.id}>
            <Card.Body>
                {props.content}
            </Card.Body>
        </Card>
    )
}


const App = () => {
    const [taskData, setTaskData] = useState(initialData)
    console.log(taskData)
    const tasks = taskData.tasks


    return (
        <Container>
            <Row>

                <Col xs={4}>

                    <Stack>
                        {tasks.map((task) => (
                            <TaskCard id={task.id} content={task.content} />
                        ))
                        }

                    </Stack>
                </Col>
            </Row>
        </Container>


    )


}

export default App;