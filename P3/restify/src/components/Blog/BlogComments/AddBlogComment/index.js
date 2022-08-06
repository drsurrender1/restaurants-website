import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState, localStorage } from "react";

import "../../../../bootstrap.min.css"
import Button from "../../../Templates/Button"
import Input from "../../../Templates/Input"


const AddBlogComment = (props) =>{
    const navigate = useNavigate();
    const location = useLocation()
    const blog_id = props.blog_id
    //const [user, setUser] = useContext(APIContext)
    // const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({ content: ''})

    const MakeRequest = (event) => {
        event.preventDefault();
        //console.log(`query beform POST=${query.title}, ${query.content}, ${query.images}`)
        //console.log(`json=${JSON.stringify(query)}`)
        const myHeaders = new Headers({
            "Authorization": `Bearer ${window.localStorage.getItem('access_token')}`,
        });
        
        // const formData = new FormData()
        // formData.append('content', query.content)

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: JSON.stringify(query.content)
        }
        fetch(`http://localhost:8000/blog/${blog_id}/comments/add/`, requestOptions)
            .then(response => response.json())
            .then(json => {console.log(json)})
        navigate(-1)
        
    }

    return <>
        <body>
        <div className="addBlogComment">
            <p className="sign" align="center">Add Blog Comment</p>
            <form className="form1" onSubmit={MakeRequest}>
                <Input className="content" type="text" placeholder="BlogComment Content Here" update={(value) => setQuery({...query, content: value})}/>
                <input type='submit' />
            </form>
        </div>

        </body>
    </>
}

export default AddBlogComment;