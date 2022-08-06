import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import * as ReactDOM from 'react-dom';
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";
import { useContext, useState } from "react";
import {useLocation} from "react-router-dom";

const EditFood = () => {
    const location = useLocation()
    const { id }= location.state
    const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({ name: '', restaurant: '', description: '',price:''})
    //const [query, setQuery] = useState({username: '',email:'',phone_number:'',first_name:'',last_name:'',password:'',password2:'' });
    const [error, setError] = useState('')


    const getUserInfo = () => {
        if(flag===0){

            const myHeaders = new Headers({
                //'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
            });
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                //body: JSON.stringify(query)
            };
            fetch(`http://127.0.0.1:8000/restaurant/${localStorage.getItem('restaurant')}/menu/${id}/edit/`, requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    setQuery({...query, name: json['name'], price: json['price'],
                        restaurant: json['restaurant'], description: json['description'],
                        oldimages: json['images']})
                })
            setFlag(1)
        }
    }

    const MakeRequest = (event) => {
        console.log("query here"+JSON.stringify(query))
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
            method: 'PATCH',
            mode: 'cors',
            headers: myHeaders,
            body: formData
        };

        fetch(`http://127.0.0.1:8000/restaurant/${localStorage.getItem('restaurant')}/menu/${id}/edit/`, requestOptions)
            .then(response => {if (response.ok) {
                return response.json();}
                return Promise.reject(response);})
            .then(json => {console.log(json)
                window.location.href = "http://127.0.0.1:3000/editMenu/"
            })
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
                    })});

    }


    getUserInfo()
    console.log(`query before form=${JSON.stringify(query)}`)
    return <>
        <form onSubmit={MakeRequest} className="padding" style={{"margin-left":"38%", "margin-top":"5%"}}>
            <label>name: <Input type="text" id="name" value = {query.name}  update={(value) => setQuery({...query, name: value})}/></label>
            <p className="notification" id="username_notification"></p>

            <label>price: <Input type="text" id="price" update={(value) => setQuery({...query, price: value})} value = {query.price}/></label>
            <p className="notification" id="email_notification"></p>

            <label>description: <Input type="text" id="description" update={(value) => setQuery({...query, description: value})} value = {query.description}/></label>
            <p className="notification" id="phone_notification"></p>

            <label>images: <img src= {query.oldimages} id="images" /></label>
            <p className="notification" id="first_name_notification"></p>

            <p className="m-b-10 f-w-600">Change picture</p>
            <input className="image"
                                                              type="file"
                                                              placeholder="Image Here"
                                                              onChange={e => {setQuery({
                                                                  ...query,
                                                                  images: e.target.files[0]
                                                              })
                                                                  console.log(`onChange Here ${e.target.files[0]}`)}}/>
            {error? <p className = "notification" style={{fontSize:20,color:"red"}}>{error}</p>:<></>}
            <br/>
            <input type='submit' className="mt-2"/>


        </form>

    </>
}
export default EditFood;