import React, { useState, useEffect } from 'react';

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react



const App = () => {
    const [timeVar, setTimeVar] = useState(null)

    useEffect(() => {
      
        fetch('/tasks/test').then(
            (response) => response.json()).then(
                data => {
                    setTimeVar(data.task_list)
                }
            )

    }, [])
    


    return (
            

        <div>
            <span>{timeVar} asdasd asd</span>
        </div>


    )


}

export default App;