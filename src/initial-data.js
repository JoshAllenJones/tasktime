const initialData = {
    tasks: [
        {id: "task-1", content: 'Do that Pull Request'},
        {id: "task-2", content: 'Review That Code'},
        {id: "task-3", content: 'Slap that Guy'},

    ],
    columns: {
        'column-1':{
            id: 'column-1',
            title: 'Monday',
            taskIds: ['task-1', 'task-2',  'task-3']
        },
        'column-2':{
            id: 'column-2',
            title: 'Tuesday',
            taskIds: []
        }
    },
    columnOrder: ['column-1', "column-2"]
}

export default initialData