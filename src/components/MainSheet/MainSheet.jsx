import { Card, TextInput, createStyles } from "@mantine/core";
import { useState } from "react";

const useStylesTopInput = createStyles((theme) => ({
    input: {
        border: "none",
        paddingLeft: 0  
    },
}))




const MainSheet = (props) => {

    const { classes } = useStylesTopInput()


    return (
        <Card sx={{height: "90vh"}} shadow="sm" radius="md" >
            <TextInput classNames={{ input: classes.input}} size="xl" />
            <TextInput size="md" styles={{input: { paddingLeft: 0, border: "none"}}} /> 
        </Card>

    )

}




export default MainSheet