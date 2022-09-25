import { useState } from "react";
import { Textarea, Text, Stack, Grid } from "@mantine/core";


export default function SubBlock (props) {

    let subBlockObj = props.subObj
    let subBlockId = subBlockObj.task_block_id
    let blockContent = subBlockObj.block_content
    let [inputState, setInputState] = useState("unstyled")
    let textVal = null



    return (
        <Grid.Col span={12}>
            <Textarea value={blockContent} label={subBlockObj.created}  
            variant="unstyled" autosize />
        </Grid.Col>
        
    )

}