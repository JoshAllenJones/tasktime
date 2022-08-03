import axios from 'axios';
import React, { useState, useEffect } from 'react';


//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react



const App = () => {
    const [timeVar, setTimeVar] = useState(null)

    useEffect(() => {
      
        fetch('/time').then(
            (response) => response.json()).then(
                data => {
                    setTimeVar(data.time)
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