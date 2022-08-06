import axios from "axios";
import { useContext, useEffect, useState, localStorage } from "react";

import "../../../bootstrap.min.css"
import Button from "../../Templates/Button"
import Input from "../../Templates/Input"


const RestAddComment = () =>{

    //const [user, setUser] = useContext(APIContext)
    // const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({ title: '', content: ''})

    const MakeRequest = (event) => {
        event.preventDefault();
        //console.log(`query beform POST=${query.title}, ${query.content}, ${query.images}`)
        //console.log(`json=${JSON.stringify(query)}`)
        const myHeaders = new Headers({
            // 'boundary': "coolBoundary",
            // 'Content-Type': null,
            "Authorization": `Bearer ${window.localStorage.getItem('access_token')}`,
        });

        const formData = new FormData()
        formData.append('content', query.content)

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: formData
        }
        fetch('http://localhost:8000/restaurant/id/add/', requestOptions)
            .then(response => response.json())
            .then(json => {console.log(json)})
        // axios.post('http://localhost:8000/blog/add/', formData, myHeaders)
        //     .then(response => response.json())
        //     .then(json => {console.log(json)})
    }

    return <>
        <body>

        <div className="addBlog">

            <p className="sign" align="center">Add Blog for your Restaurant</p>
            <form className="form1" onSubmit={MakeRequest}>

                <Input className="content" type="text" placeholder="Blog Content Here" update={(value) => setQuery({...query, content: value})}/>

                <input type='submit'/>

            </form>
        </div>

        </body>
    </>
}

export default RestAddComment;