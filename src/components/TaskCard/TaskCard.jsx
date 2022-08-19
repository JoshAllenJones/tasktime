import {Card, Col, Row, Button, Collapse, Table, Empty} from 'antd';
import axios from 'axios';
import {useState} from 'react'
import { useRecoilState } from 'recoil';
import { clockInAtom } from '../../atoms/clockInAtom'
const { Panel } = Collapse;


let columns = [
    {
        title: "Clock In",
        dataIndex: "clockIn",
        key: "clockIn"
    },
    {
        title: "Clock Out",
        dataIndex: "clockOut",
        key: "clockOut"
    },
    {
        title: "Total Time",
        dataIndex: "totalTime",
        key: "totalTime"
    }
]


let TaskCard = (props) => {
    const [task, setTask] = useState(props.task)

    let taskId = task.task_id

    let TopBar = () => {

        const clockIn = () => {
            let formData = new FormData()
            formData.append('task_id', taskId)
            axios.post('/task/clock-in', formData).then((response) => {
                console.log(response)
            }).then((error) => {

            })
        }

        const clockOut = () => {

        }


        return (
            <Row justify="space-between">
                <Col span={8}>
                    {task.task_title}
                </Col>
                <Col span={4}>
                    <Button type="primary">Clock-in</Button>
                </Col>
                <Col span={3} justify="end">
                    {task.task_created}
                </Col>
            </Row>
        )
    }

    let LogTable = () => {
        let taskLog = task.log_entries;
        if (!taskLog){
            return <Empty />
        }
        let tableData = []
        for (let logItem of taskLog) {
            tableData.append(
                {
                    key: logItem.task_id,
                    clockIn: logItem.clock_in,
                    clockOut: logItem.clock_out,
                    totalTime: logItem.total_time
                }
            )
        }

        if (tableData.length > 0){
            return (
                <Table columns={columns} dataSource={tableData}  />
            )

        } else {
            return <Empty/>
        }
        

    }

    
    return (
        <Col span={24} key={task.task_id}>
            <Card style={{margin: ".25rem", borderRadius: "1rem"}} title={<TopBar/>}>
                <Row>
                    <Col span={24}>
                        <Collapse ghost>
                            <Panel header="Logbook">
                                <LogTable/>
                            </Panel>
                    </Collapse>
                    </Col>
                    <Col span={24}>
                        {task.description}
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>                
            </Card>
        </Col>
    )


}

export default TaskCard