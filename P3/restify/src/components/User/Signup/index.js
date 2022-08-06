import { useContext, useEffect, useState } from "react";

import "./style.css"
import Input from "../../Templates/Input"




const SignUp = () =>{

    const [error, setError] = useState('')
    // const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({ username: 'REACTUser1', password: '11111111', password2: '11111111'})

    const MakeRequest = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query)
        };
    
        fetch('http://127.0.0.1:8000/accounts/profile/register/', requestOptions)
            .then(response =>
                {if (response.ok) {
                    return response.json();}
                return Promise.reject(response);})
            .then(json => {console.log(json)
                window.location.href = "http://127.0.0.1:3000/login/"
            })
            .catch((response) =>  {
                console.log(response.status, response.statusText);
                // 3. get error messages, if any
                response.json()
                    .then((json) => {
                        if(json.password){
                            setError(json.password)}else{setError(json.username)}
                    })
                });
    }
    
    return <>
        <body>

        <div className="main">

            <p className="sign" align="center">Sign Up</p>
            <form className="form1" onSubmit={MakeRequest}>
                
                <Input className="un " type="text" placeholder="Username" update={(value) => setQuery({...query, username: value})}/>
                <Input className="pass" type="password" placeholder="Password" update={(value) => setQuery({...query, password: value})}/>
                <Input className="pass" type="password" placeholder="Confirm Password" update={(value) => setQuery({...query, password2: value})}/>
                <input className="submit" type="submit" value="Sign Up"></input>
                {error? <p className = "notification" style={{fontSize:24,color:"red"}}>{error}</p>:<></>}
                            
            </form>
        </div>

        </body>
    </>
}

export default SignUp;