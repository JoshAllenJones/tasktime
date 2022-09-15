import {TextInput, Group, Textarea, Grid, Butto, ActionIcon} from '@mantine/core'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { useRecoilState } from 'recoil'
import { currentlyViewingAtom } from '../../atoms/currentlyViewingAtom'


const MainBlock = (props) => {
	const taskObj = props.taskObj
	const taskId = taskObj.task_id

	const [taskTitle, setTaskTitle] = useState(null)
	const [viewing, setViewing] = useRecoilState(currentlyViewingAtom)

    const keyUpHandler = (event) => {
        if (event.charCode == 13){
			event.preventDefault()
            console.log('HELLLLLLO ENTER KEY!')
        }
    }

	const updateTask = (event) => {
		
	}

	const viewTask = (event) => {
		setViewing(taskId)

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
			withAsterisk onKeyPress={keyUpHandler} value={taskObj.task_title}  onChange={handleInput} />

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