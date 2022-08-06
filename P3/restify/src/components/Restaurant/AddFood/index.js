import { useContext, useEffect, useState } from "react";
import "../../../bootstrap.min.css"
import Input from "../../Templates/Input"
import {Link} from "react-router-dom";



const AddFood = () =>{
    //const [user, setUser] = useContext(APIContext)
    // const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({ name: '', restaurant: '', description: '',price:''})
    const [error, setError] = useState('')
    const MakeRequest = (event) => {
        event.preventDefault();
        const myHeaders = new Headers({
            //'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
        });

        const formData = new FormData()

        if(query.name){
            formData.append('name', query.name)
        }
        if(query.description) {
            formData.append('description', query.description)
        }
        if(query.price) {
            formData.append('price', query.price)
        }
        if(query.images) {
            formData.append('images', query.images)
        }

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            body: formData
        };
        console.log("rest",localStorage.getItem('restaurant'))
        fetch('http://127.0.0.1:8000/restaurant/'+localStorage.getItem('restaurant')+'/menu/add/', requestOptions)
            .then(response => {if (response.ok) {
                return response.json();}
                return Promise.reject(response);})
            .then(json => {console.log("add food",json)
                    window.location.reload(false)
                }
            )
            .catch((response) =>  {
                console.log(response.status, response.statusText);
                // 3. get error messages, if any
                response.json()
                    .then((json) => {console.log(json)
                        if(json.price){
                            setError(json.price)
                        }else if(json.name){
                            setError(json.price)
                        }else if(json.description){
                            setError(json.description)
                        }
                    })
            });
    }

    return <form onSubmit={MakeRequest}>
        <thead>
            <tr>
                <th>image</th>
                <th>name</th>
                <th>description</th>
                <th>price</th>

            </tr>
        </thead>
        <tbody>
        <tr >

            <td><input className="image"
                       type="file"
                       placeholder="Image Here"
                       onChange={e => {setQuery({
                           ...query,
                           images: e.target.files[0]
                       })
                           console.log(`onChange Here ${e.target.files[0]}`)}}/></td>
            <td><Input type="text" id="name"  update={(value) => setQuery({...query, name: value})}/></td>
            <td><Input type="text" id="description" update={(value) => setQuery({...query, description: value})} /></td>
            <td><Input type="text" id="price" update={(value) => setQuery({...query, price: value})} /></td>
            <input type='submit'/>

        </tr>
        </tbody>
        {/*<div className="main">*/}
        {/*    <form onSubmit={MakeRequest}>*/}
        {/*        <label>name: <Input type="text" id="name"  update={(value) => setQuery({...query, name: value})}/></label>*/}
        {/*        <p className="notification" id="username_notification"></p>*/}


        {/*        <label>description: <Input type="text" id="description" update={(value) => setQuery({...query, description: value})} /></label>*/}
        {/*        <p className="notification" id="email_notification"></p>*/}

        {/*        <label>price: <Input type="text" id="price" update={(value) => setQuery({...query, price: value})} /></label>*/}
        {/*        <p className="notification" id="phone_notification"></p>*/}

        {/*        <p className="m-b-10 f-w-600">Change Avatar<input className="image"*/}
        {/*                                                          type="file"*/}
        {/*                                                          placeholder="Image Here"*/}
        {/*                                                          onChange={e => {setQuery({*/}
        {/*                                                              ...query,*/}
        {/*                                                              images: e.target.files[0]*/}
        {/*                                                          })*/}
        {/*                                                              console.log(`onChange Here ${e.target.files[0]}`)}}/></p>*/}


        {/*        /!*<label>logo: <input type="file" id="logo" update={(value) => setQuery({...query, logo: value})} value = {query.logo}/></label>*!/*/}
        {/*        /!*<p className="notification" id="last_name_notification"></p>*!/*/}


        {/*        <input type='submit'/>*/}
        {/*        {error? <p className = "notification" style={{fontSize:20,color:"red"}}>{error}</p>:<></>}*/}

        {/*    </form>*/}
        {/*</div>*/}


    </form>
}

export default AddFood;