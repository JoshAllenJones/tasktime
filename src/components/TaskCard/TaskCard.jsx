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
    const [clockIn, setClockIn] = useRecoilState(clockInAtom)

    let taskId = props.task.task_id
    const [logTable, setLogTable] = useState([])

    let TopBar = () => {

        const clockIn = () => {
            let formData = new FormData()
            formData.append('task_id', taskId)
            axios.post('/task/clock-in', formData).then((response) => {
                console.log(response)
            }).then((error) => {

            })
            setClockIn(props.task.task_id)
        }


        return (
            <Row justify="space-between">
                <Col span={8}>
                    {props.task.task_title}
                </Col>
                <Col span={4}>
                    <Button type="primary">Clock-in</Button>
                </Col>
                <Col span={3} justify="end">
                    {props.task.task_created}
                </Col>
            </Row>
        )
    }

    let LogTable = () => {
        let taskLog = props.task.log_book;
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
        setLogTable(tableData)

        if (tableData.length > 0){
            return (
                <Table columns={columns} dataSource={logTable}  />
            )

        } else {
            return <Empty/>
        }
        

    }

    
    return (
        <Col span={24} key={props.task.task_id}>
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
                        {props.task.description}
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>                
            </Card>
        </Col>
    )


}

export default TaskCard