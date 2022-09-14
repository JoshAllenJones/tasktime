import { Card, TextInput, createStyles, Text, Textarea, Title } from "@mantine/core";
import { useState } from "react";
import MainBlock from "../MainBlock/MainBlock";

const useStylesTopInput = createStyles((theme) => ({
    input: {
        border: "none",
        paddingLeft: 0  
    },
}))




const SideSheet = (props) => {



    const { classes } = useStylesTopInput()

    return (
        <Card sx={{height: "95vh"}} shadow="lg" radius="md" >
            <Text size="xl">Task Detail</Text>
            {/* <Textarea onKeyPress={keyUpHandler} variant="unstyled" />
            <TextInput size="md" styles={{input: { paddingLeft: 0, border: "none"}}} />  */}
            
        </Card>

    )

}

export default SideSheet