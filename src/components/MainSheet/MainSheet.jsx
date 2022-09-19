import { Card, TextInput, createStyles, Text, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import MainBlock from "../MainBlock/MainBlock";
import { taskListAtom } from "../../atoms/taskListAtom";
import { dailyNoteAtom } from "../../atoms/dailyNoteAtom";


const useStylesTopInput = createStyles((theme) => ({
    input: {
        border: "none",
        paddingLeft: 0  
    },
}))




const MainSheet = (props) => {

    const [taskList, setTaskList] = useRecoilState(taskListAtom)
    const dailyNote = useRecoilValue(dailyNoteAtom)

    useEffect(() => {
        axios.get('/blocks/today')
        .then((resp) => {
            console.log('GETTING TODAYS TASKS')
            console.log(resp.data.blocks)
            setTaskList(resp.data.blocks)
            console.log('TASK LIST STATE')
            console.log(taskList)
        }).catch((error)=>{
            alert(error)
        })
    }, [])

    const [taskText, setTaskText] = useState(null)

    const blocks = taskList.map((item, i) => <MainBlock key={item.block_id} taskObj={item}/>)

    const { classes } = useStylesTopInput()

    function submitTask(event) {
        if (event.key == "Enter") {
            event.preventDefault()
            let formData = new FormData()
            formData.append("block_title", taskText)
            formData.append('daily_id', dailyNote.daily_id)
            axios.post('/block/post', formData)
            .then((resp) => {
                setTaskList((current) => [...current, resp.data.new_block])
            }).catch(error => alert(error))
            console.log('BEEPPPPP')
        }
    }

    return (
        <Card sx={{height: "95vh"}} shadow="lg" radius="md" >
            <Text size="xl">{props.sheetTitle}</Text>
            <Textarea variant="unstyled" onKeyPress={submitTask} onChange={(event)=>setTaskText(event.target.value)} size="md" placeholder="add task here..." />
            {blocks}
        </Card>

    )

}




export default MainSheet