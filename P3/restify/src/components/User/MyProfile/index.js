import React, {localStorage, useState} from "react";
import {Link, useParams} from "react-router-dom";
import { useContext, useEffect } from "react";
import "../../../bootstrap.min.css"
import Input from "../../Templates/Input"
// import styled from "styled-components";
// import Header from "../Header";
// import ProfileInfo from "./ProfileInfo";
// import Tweet from "../Tweet/Tweet";
// import Loader from "../Loader";
// import { PROFILE } from "../../queries/profile";
import "./style.css"


const MyProfile = () => {
    //const [user, setUser] = useState([]);
    const [query, setQuery] = useState({username: '',avatar: '', email:'',phone_number:'',first_name:'',last_name:'',restaurant:'',id:''});
    // const [query, setQuery] = useState({username: '',email:'',phone_number:'',first_name:'',last_name:'',password:'',password2:'' });
    const [flag, setFlag] = useState(0)
    const [res, setRes] = useState(false)
    const [error, setError] = useState('')


    const getUserInfo = () => {
        if(flag===0){

            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
            });
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                //body: JSON.stringify(query)
            };
            fetch('http://127.0.0.1:8000/accounts/profile/1/edit/', requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    //console.log(json['email'])
                    setQuery({...query, email: json['email'], first_name: json['first_name'],
                        last_name: json['last_name'], username: json['username'], avatar: json['avatar'],restaurant: json['restaurant'], id:json['id'],
                        phone_number: json['phone_number']})
                    console.log('query',query)
                    console.log('id',json['id'])
                    window.localStorage.setItem('uid', json['id']);
                    window.localStorage.setItem('username', json['username']);
                    console.log(window.localStorage.getItem('uid'))
                })

            fetch(`http://127.0.0.1:8000/restaurant/${window.localStorage.getItem('uid')}/getrest/`, requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    //console.log(json['email'])
                    if(json['id']){
                        setRes(true);
                        console.log("have res")
                        console.log("res change to ",res)
                        window.localStorage.setItem('restaurant', json['id']);

                    }else{
                        setRes(false);
                        console.log("res change to ",res)
                    }
                })
            setFlag(1)
            //console.log(query.restaurant)
        }
    }
    getUserInfo()
    return (<form className="mb" style={{"background": "linear-gradient(to bottom, #27b0a5, #ffffff)"}}>


        <div className="page-content page-container" id="page-content"  onSubmit="return false" >
            <div className="padding">
                <div className="row  d-flex justify-content-center">
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-12 user-profile " style={{"background": "linear-gradient(to bottom, #27b0a5, #ffffff)"}}>
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25"><img
                                            src={query.avatar}
                                            className="img-radius" alt="User-Profile-Image"/></div>
                                        <h6 className="f-w-600">{query.username}</h6>
                                        <p>{query.first_name} , {query.last_name}</p> <i
                                        className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">First Name</p>
                                                <h6 className="text-muted f-w-400">{query.first_name}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Last Name</p>
                                                <h6 className="text-muted f-w-400">{query.last_name}</h6>
                                            </div>

                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Username</p>
                                                <h6 className="text-muted f-w-400">{query.username}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{query.email}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Phone</p>
                                                <h6 className="text-muted f-w-400">{query.phone_number}</h6>
                                            </div>

                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Restaurant</p>{res? <h6 className="text-muted f-w-400">{query.restaurant}</h6> :
                                                <h6 className="text-muted f-w-400">N/A</h6>}

                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Favorites</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Recent</p>
                                                <h6 className="text-muted f-w-400">Recent restaurant link here?</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Feed</p>
                                                <h6 className="text-muted f-w-400">Feed Card Link here?</h6>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <Link to="/editProfile" className="btn btn-white btn-outline-success text-black nav-link text-secondary align-c ">Edit Profile</Link>
                                    <br/>
                                    {!res ?<Link to="/createRestaurant" className="btn btn-white  btn-outline-success text-black nav-link text-secondary align-c">Create restaurant</Link>:
                                        <><Link to="/viewRestaurant" state={{id: window.localStorage.getItem('restaurant')}} className="btn btn-white btn-outline-success text-black nav-link text-secondary align-c">My restaurant</Link>
                                            <br/>
                                        <Link to="/editRestaurant" className="btn btn-white btn-outline-success text-black nav-link text-secondary align-c">Edit restaurant</Link></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </form>)
}
export default MyProfile;