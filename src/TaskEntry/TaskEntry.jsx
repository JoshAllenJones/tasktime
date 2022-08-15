import {React, useState} from "react";
import {Card, Input, Row, Col, Button} from 'antd';
import { DownCircleOutlined } from "@ant-design/icons";

import { taskListAtom } from "../atoms/taskListAtom";
import axios from 'axios'
import { useRecoilState } from 'recoil'


function TaskEntry() {

    const [taskTitle, setTaskTitle] = useState("");
    let handleInput = (event) => {
        let content = event.target.value
        setTaskTitle(content)
        
    }
    const [_, setTaskList] = useRecoilState(taskListAtom)

    let submitHandler = (event) => {
        event.preventDefault()
        if (taskTitle.trim().length === 0 ){
            console.log('Cant use this value')
            return false
        }
        
        let formData = new FormData()
        formData.append('task_title', taskTitle)
        axios.post('/task/post', formData).then(
            function(response){
                setTaskList(response.data.task_list)
            }
        ).catch(
            function(error){
                console.log(error)
            }
        )
        
        setTaskTitle('')
    }


    return (
        <Card>
        <form onSubmit={submitHandler}>
            <Row>
                    <Col span={20}>
                        <Input size="large" value={taskTitle} onChange={handleInput} bordered={false}></Input>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={submitHandler} block><DownCircleOutlined /></Button>
                    </Col>
            </Row>
        </form>
        </Card>
    )
}

export default TaskEntry