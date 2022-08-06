import axios from "axios";
import { useContext, useEffect, useState, localStorage } from "react";

import "../../../bootstrap.min.css"
import Button from "../../Templates/Button"
import Input from "../../Templates/Input"


const AddBlog = () =>{

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
        formData.append('title', query.title)
        formData.append('content', query.content)
        formData.append('images', query.images)

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: formData
        }
        fetch('http://localhost:8000/blog/add/', requestOptions)
            .then(response => response.json())
            .then(json => window.location.href = "http://127.0.0.1:3000/viewRestaurant/")
        // axios.post('http://localhost:8000/blog/add/', formData, myHeaders)
        //     .then(response => response.json())
        //     .then(json => {console.log(json)})
    }

    return <>

        <div className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="my-5">
                            <form id="contactForm" onSubmit={MakeRequest}>
                                <p className="sign" align="center">Add Blog for your Restaurant</p>
                                <div className="form-floating">
                                    <Input className="form-control"  type="text"  update={(value) => setQuery({...query, title: value})}
                                           placeholder="Enter your title here..." data-sb-validations="required"/>
                                    <label htmlFor="name">Title</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A title is
                                        required.
                                    </div>
                                </div>

                                <div className="form-floating">
                                    <Input className="form-control" type="text"  update={(value) => setQuery({...query, content: value})}
                                              placeholder="Enter your content here..." style={{"height": "12rem"}}
                                              data-sb-validations="required"></Input>
                                    <label htmlFor="message">Content</label>
                                    <div className="invalid-feedback" data-sb-feedback="message:required">A content is
                                        required.
                                    </div>
                                </div>
                                <br/>
                                <p>Select your photo</p>
                                <input className="image" type="file" placeholder="Image Here"
                                       onChange={e => setQuery({...query, images: e.target.files[0]})}/>
                                <br/>
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className="text-center mb-3">
                                        <div className="fw-bolder">Post blog successful!</div>

                                        <br/>

                                    </div>
                                </div>

                                <div className="d-none" id="submitErrorMessage">
                                    <div className="text-center text-danger mb-3">Error sending message!</div>
                                </div>

                                <input className="btn btn-primary text-uppercase mt-2" type='submit' value="Post"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
    </>
}

export default AddBlog;