import React, {useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import * as ReactDOM from 'react-dom';
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";
import { useContext, useState } from "react";
// import styled from "styled-components";
// import Header from "../Header";
// import ProfileInfo from "./ProfileInfo";
// import Tweet from "../Tweet/Tweet";
// import Loader from "../Loader";
// import { PROFILE } from "../../queries/profile";
import "./style.css"


const EditProfile = () => {
    //const navigate = useNavigate()
    const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({username: '',email:'',phone_number:'',first_name:'',last_name:'', id:'' });
    const [error, setError] = useState('')
    const uid = window.localStorage.getItem('uid')

    const getUserInfo = () => {
        if(flag===0){
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
            });

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                // body: JSON.stringify(query)
            };
            fetch(`http://127.0.0.1:8000/accounts/profile/${uid}/edit/`, requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    console.log(json['email'])
                    setQuery({...query, email: json['email'], first_name: json['first_name'],
                        last_name: json['last_name'], username: json['username'],
                        phone_number: json['phone_number']})
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

        if(query.avatar){
            formData.append('avatar', query.avatar)
        }
        if(query.email) {
            formData.append('email', query.email)
        }
        if(query.first_name) {
            formData.append('first_name', query.first_name)
        }
        if(query.last_name) {
            formData.append('last_name', query.last_name)
        }
        if(query.password) {
            formData.append('password', query.password)
        }
        if(query.password2) {
            formData.append('password2', query.password2)
        }
        console.log(formData)

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            mode: 'cors',
            body: formData
        };

        fetch(`http://127.0.0.1:8000/accounts/profile/${uid}/edit/`, requestOptions)
            .then(response => {if (response.ok) {
                return response.json();}
                return Promise.reject(response);})
            .then(json => {console.log(json)
                window.location.href = "http://127.0.0.1:3000/myProfile/"})
            .catch((response) =>  {
                console.log(response.status, response.statusText);
                // 3. get error messages, if any
                response.json()
                    .then((json) => {console.log(json)
                        if(json.email){
                            setError(json.email)}
                        else if(json.phone_number){
                            setError(json.phone_number)
                        }else if(json.password){
                            setError(json.password)
                        }else if(json.password2){
                            setError(json.password2)
                        }})
            });
        //navigate('/myProfile')
    }


    getUserInfo()
    console.log(`query before form=${JSON.stringify(query)}`)
    return (<>

        <form style={{"background": "linear-gradient(to right, #27b0a5, #E040FB)","height": "881px"}} onSubmit={MakeRequest}>


            <div className="page-content page-container" id="page-content"  onSubmit="return false" >
                <div className="padding">
                    <div className="row  d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-12 user-profile " style={{"background": "linear-gradient(to right, #27b0a5, #E040FB)"}}>
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25"><img
                                                src={query.avatar}
                                                className="img-radius" alt="User-Profile-Image"/></div>
                                            <p className="m-b-10 f-w-600">Change Avatar<input className="image"
                                                                                              type="file"
                                                                                              placeholder="Image Here"
                                                                                              onChange={e => {setQuery({
                                                                                                  ...query,
                                                                                                  avatar: e.target.files[0]
                                                                                              })
                                                                                                console.log(`onChange Here ${e.target.files[0]}`)}}/></p>
                                            <h6 className="f-w-600">{query.username}</h6>
                                            <p>{query.first_name} , {query.last_name}</p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Username</p>
                                                    <Input type="text" id="username" value = {query.username}  update={(value) => setQuery({...query, username: value})}
                                                           placeholder={query.username}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <Input type="text" id="email" update={(value) => setQuery({...query, email: value})} value = {query.email}
                                                           placeholder={query.email}/>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">First Name</p>
                                                    <Input type="text" id="first_name" update={(value) => setQuery({...query, first_name: value}) } value = {query.first_name}
                                                           placeholder={query.first_name}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Last Name</p>
                                                    <Input type="text" id="last_name" update={(value) => setQuery({...query, last_name: value})} value = {query.last_name}
                                                           placeholder={query.last_name}/>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">New Password</p>
                                                    <Input type="password" id="password" update={(value) => setQuery({...query, password: value})}
                                                           placeholder={query.password}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Confirmed Password</p>
                                                    <Input type="password" id="password2" update={(value) => setQuery({...query, password2: value})}
                                                           placeholder={query.password2}/>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <Input type="text" id="phone_number" update={(value) => setQuery({...query, phone_number: value})} value = {query.phone_number}
                                                           placeholder={query.phone_number}/>
                                                </div>

                                                <input className="submit col-2" type="submit" value="save"/>
                                                {error? <p className = "notification" style={{fontSize:20,color:"red"}}>{error}</p>:<></>}

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>


    </>)
}
export default EditProfile;