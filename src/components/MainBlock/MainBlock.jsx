import {TextInput, Group, Textarea, Grid, Butto, ActionIcon} from '@mantine/core'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useState } from 'react'

import { useRecoilState } from 'recoil'
import { currentlyViewingAtom } from '../../atoms/currentlyViewingAtom'
import { subBlocksAtom } from '../../atoms/subBlocksAtom'


const MainBlock = (props) => {
	const blockObj = props.taskObj
	const blockId = blockObj.block_id

	const [taskTitle, setTaskTitle] = useState(null)
	const [viewing, setViewing] = useRecoilState(currentlyViewingAtom)
	const [subBlocks, setSubBlocks] = useRecoilState(subBlocksAtom)

    const keyUpHandler = (event) => {
        if (event.charCode == 13){
			event.preventDefault()
            console.log('HELLLLLLO ENTER KEY!')
        }
    }

	const updateTask = (event) => {
		
	}

	const viewTask = (event) => {
		axios.get(`/blocks/${blockId}`)
		.then((resp) => {
			console.log(resp.data)
			setViewing(({...resp.data}))
			setSubBlocks([...resp.data.sub_blocks])
			console.log("SUB BLOCKS")
			console.log(subBlocks)
		}).catch((error) => {
			alert(error)
		})

	}

	const handleInput = (event) => {
		setTaskTitle(event.target.value)
		console.log(taskTitle)
	}

	return (
		<Grid align="center">

			<Grid.Col span={10}>
			<Textarea
			variant="unstyled"
			autosize
			withAsterisk onKeyPress={keyUpHandler} value={blockObj.block_title}  onChange={handleInput} />

			</Grid.Col>
			<Grid.Col span={2}>
				<ActionIcon>
					<ArrowRightIcon onClick={viewTask} />
				</ActionIcon>
			</Grid.Col>
		</Grid>
	  

	)
}	

export default MainBlock