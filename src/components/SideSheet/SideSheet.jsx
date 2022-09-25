import { Card, createStyles, Text, TextInput, Textarea, Title, Group, Button, Grid } from "@mantine/core";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import axios from "axios";
import MainBlock from "../MainBlock/MainBlock";
import SubBlock from "../SubBlock/SubBlock";
import { currentlyViewingAtom } from "../../atoms/currentlyViewingAtom";
import { subBlocksAtom } from "../../atoms/subBlocksAtom";
import './sidesheet.css'

const useStylesTopInput = createStyles((theme) => ({
    input: {
        border: "none",
        paddingLeft: 0  
    },
}))




const SideSheet = (props) => {

    const [currentlyViewing, setCurrentlyViewing] = useRecoilState(currentlyViewingAtom)
    const taskObj = props.taskObj
    const [subBlocks, setSubBlocks] = useRecoilState(subBlocksAtom)
    function addSubBlock() {
        let formData = new FormData()
        formData.append('block_id', taskObj.block_id)
        axios.post('/blocks/subblock/add', 
            formData
        ).then((resp) => {
            setSubBlocks((current) => [...current, resp.data.new_block])
            console.log(subBlocks)
        }).catch((error) => {
            alert(error)
        })
    }

    let blockElements = subBlocks.map((item, i) => <SubBlock key={i} subObj={item} /> )

    const { classes } = useStylesTopInput()

    return (
        <Card sx={{height: "95vh"}} shadow="lg" radius="md" >
            <Grid>
                <Grid.Col span={12}>
                    <Group position="apart">
                        <Text size="xl">{taskObj.block_title}</Text>
                        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Clock In</Button>
                    </Group>

                </Grid.Col>
                {blockElements}
                <Button variant="light" onClick={addSubBlock} radius="md" size="xl" fullWidth>
                    <PlusIcon />
                </Button>

            </Grid>
            
        </Card>

    )

}

export default SideSheet