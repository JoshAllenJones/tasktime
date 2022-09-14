import { Card, TextInput, createStyles, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import MainBlock from "../MainBlock/MainBlock";
import { taskListAtom } from "../../atoms/taskListAtom";


const useStylesTopInput = createStyles((theme) => ({
    input: {
        border: "none",
        paddingLeft: 0  
    },
}))




const MainSheet = (props) => {

    const [taskList, setTaskList] = useRecoilState(taskListAtom)
    const [taskText, setTaskText] = useState(null)

    const { classes } = useStylesTopInput()

    function submitTask(event) {
        if (event.key == "Enter") {
            event.preventDefault()
            let formData = new FormData()
            formData.append("task_content", taskText)
            axios.post()
            console.log('BEEPPPPP')
        }
    }

    return (
        <Card sx={{height: "95vh"}} shadow="lg" radius="md" >
            <Text size="xl">{props.sheetTitle}</Text>
            <Textarea variant="unstyled" onKeyPress={submitTask} onChange={(event)=>setTaskText(event.target.value)} size="md" placeholder="add task here..." />
            {taskList.map((item)=> {
                <MainBlock {...item} />
                
            })}
        </Card>

    )

}




export default MainSheet