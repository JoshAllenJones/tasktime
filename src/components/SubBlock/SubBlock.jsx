import { useState } from "react";
import { Textarea, Text, Stack, Grid } from "@mantine/core";


export default function SubBlock (props) {

    let subBlockObj = props.subObj
    let subBlockId = subBlockObj.task_block_id
    let [inputState, setInputState] = useState("unstyled")
    let textVal = null



    return (
        <Grid.Col span={12}>
            <Textarea label={subBlockObj.created}  
            variant="unstyled" autosize />
        </Grid.Col>
        
    )

}