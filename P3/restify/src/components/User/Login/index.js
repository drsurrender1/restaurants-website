import React, { Component , localStorage } from "react";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/index";
import "./style.css"
import Input from "../../Templates/Input"

const Login = () => {
    const [query, setQuery] = useState({ username: 'REACTUser1', password: '11111111'})
    const [error, setError] = useState('')

    const MakeRequest = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query)
        };
    
        fetch('http://127.0.0.1:8000/accounts/api/token/', requestOptions)
            .then(response => {if (response.ok) {
                return response.json();}
                return Promise.reject(response);})
            .then(json => {
            console.log('new fetch');
            console.log(json);
            console.log(json.access);
            window.localStorage.setItem('access_token', json.access);
            console.log(window.localStorage.getItem('access_token'));
            window.location.href = "http://127.0.0.1:3000/myProfile/"
            })
            .catch((response) =>  {
                console.log(response.status, response.statusText);
                // 3. get error messages, if any
                response.json()
                    .then((json) => {console.log(json)
                        setError(json.detail)})
            });
    }

    return (<>
            <div className="main" >

            <p className="sign" align="center">Login</p>
            <form className="form1" onSubmit={MakeRequest}>
                
                <Input className="un " type="text" placeholder="Username" update={(value) => setQuery({...query, username: value})}/>
                <Input className="pass" type="password" placeholder="Password" update={(value) => setQuery({...query, password: value})}/>
                <input className="submit" type='submit' value="Login" ></input>
                {error? <p className = "notification" style={{fontSize:20,color:"red"}}>{error}</p>:<></>}

            </form>

            </div>
        </>)
    }

export default Login;