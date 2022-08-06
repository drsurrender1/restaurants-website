import {Link} from "react-router-dom";
import React,{useState} from "react";
import * as ReactDOM from 'react-dom';
import Input from "../../Templates/Input"
import "./style.css"

const EditRestaurant = () => {
    const [flag, setFlag] = useState(0)
    const [error, setError] = useState('')
    const [query, setQuery] = useState({name: '',owner:'',phone_number:'',postal_code:'',followers:'',description:'',address:'',likes:'',logo:'' });
    console.log(localStorage.getItem('access_token'))
    console.log(localStorage.getItem('restaurant'))

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
            fetch('http://127.0.0.1:8000/restaurant/'+localStorage.getItem('restaurant')+'/edit/', requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    //console.log(json['email'])
                    setQuery({...query, name: json['name'], owner: json['owner'],
                        phone_number: json['phone_number'], postal_code: json['postal_code'],description: json['description'],
                        oldlogo: json['logo']})
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

        if(query.phone_number) {
            formData.append('phone_number', query.phone_number)
        }
        if(query.postal_code) {
            formData.append('postal_code', query.postal_code)
        }

        if(query.description) {
            formData.append('description', query.description)
        }
        if(query.address) {
            formData.append('address', query.address)
        }
        if(query.logo) {
            formData.append('logo', query.logo)
        }
        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            mode:'cors',
            body: formData
        };


        fetch('http://127.0.0.1:8000/restaurant/'+localStorage.getItem('restaurant')+'/edit/', requestOptions)
            .then(response => {if (response.ok) {
                return response.json();}
                return Promise.reject(response);})
            .then(json => {console.log(json)
                window.location.href = "http://127.0.0.1:3000/myProfile/"}
            )
            .catch((response) =>  {
                console.log(response.status, response.statusText);
                // 3. get error messages, if any
                response.json()
                    .then((json) => {console.log(json)
                        if(json.phone_number){
                            setError(json.phone_number)}
                        else if(json.logo){
                            setError(json.logo)}

                    })
            });
    }
    getUserInfo()
    console.log(`query before form=${JSON.stringify(query)}`)

    return <>
        <form style={{"background": "linear-gradient(to right, #A2B38B, #E6BA95)"}} onSubmit={MakeRequest}>


            <div className="page-content page-container" id="page-content"  onSubmit="return false" >
                <div className="padding">
                    <div className="row  d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-12 user-profile " style={{"background": "linear-gradient(to right, #A2B38B, #E6BA95)"}}>
                                        <div className="card-block text-center text-white">

                                            <div className="m-b-25"><img
                                                src={query.oldlogo}
                                                className="img-radius" alt="Restaurant-Logo"/></div>
                                            <p className="m-b-10 f-w-600">Change logo<input className="image"
                                                                                              type="file"
                                                                                              placeholder="Image Here"
                                                                                              onChange={e => {setQuery({
                                                                                                  ...query,
                                                                                                  logo: e.target.files[0]
                                                                                              })
                                                                                                  console.log(`onChange Here ${e.target.files[0]}`)}}/></p>

                                            <h6 className="f-w-600">{query.name}</h6>
                                            <p>{query.address} </p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Restaurant Name</p>
                                                    <Input type="text" id="name" value = {query.name}  update={(value) => setQuery({...query, name: value})}
                                                           placeholder={query.name}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Postal Code:</p>
                                                    <Input type="text" id="postal_code" update={(value) => setQuery({...query, postal_code: value})} value = {query.postal_code}
                                                           placeholder={query.postal_code}/>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <Input type="number" id="phone_number" update={(value) => setQuery({...query, phone_number: value})} value = {query.phone_number}
                                                           placeholder={query.phone_number}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Address</p>
                                                    <Input type="text" id="address" update={(value) => setQuery({...query, address: value})} value = {query.address}
                                                           placeholder={query.address}/>
                                                </div>


                                                <div className="col-sm-12">
                                                    <p className="m-b-10 f-w-600">Description</p>
                                                    <Input type="text" id="description" update={(value) => setQuery({...query, description: value})} value = {query.description}
                                                           placeholder={query.description}/>
                                                </div>


                                                <input className="submit col-4 text-black" type="submit" style={{"background": "linear-gradient(to right, #A2B38B, #E6BA95)"}} value="Edit Restaurant"/>
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
    </>
}
export default EditRestaurant;