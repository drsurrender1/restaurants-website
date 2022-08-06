import {Link} from "react-router-dom";
import {useState} from "react";
import Input from "../../Templates/Input"
import "./style.css"


const CreateRestaurant = () =>{


    //const [user, setUser] = useContext(APIContext)
    // const [flag, setFlag] = useState(0)
    const [query, setQuery] = useState({name: '',owner:Number(localStorage.getItem("uid")),phone_number:'',postal_code:'',description:'',address:'',logo: null });
    const[uid, setUid] = useState(-1)

    const MakeRequest = (event) => {

        event.preventDefault();
        const userId=Number(localStorage.getItem("uid"))
        console.log(userId)
        setUid(userId)

        //V
        //console.log(query.owner)
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(query),
        };
        fetch('http://127.0.0.1:8000/restaurant/add/', requestOptions)
            .then(response => response.json())
            .then(json => {console.log(json)
                localStorage.setItem("restaurant", json['id'])
                window.location.href = "http://127.0.0.1:3000/myProfile/"
                }
            )

    }

    return (<>


        <form style={{"background": "linear-gradient(to right, #F14616, #000000)","height": "881px"}} onSubmit={MakeRequest}>


            <div className="page-content page-container" id="page-content"  onSubmit="return false" >
                <div className="padding">
                    <div className="row  d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-12 user-profile " style={{"background": "linear-gradient(to right, #F14616, #000000)"}}>
                                        <div className="card-block text-center text-white">

                                            <p>Create your owner restaurant!</p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Restaurant Name</p>
                                                    <Input type="text" id="name" value = {query.name}  update={(value) => setQuery({...query, name: value})}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Postal Code:</p>
                                                    <Input type="text" id="postal_code" update={(value) => setQuery({...query, postal_code: value})} value = {query.postal_code}/>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <Input type="number" id="phone_number" update={(value) => setQuery({...query, phone_number: value})} value = {query.phone_number}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Address</p>
                                                    <Input type="text" id="address" update={(value) => setQuery({...query, address: value})} value = {query.address}/>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Logo</p>
                                                    <input type="file" id="logo" update={(value) => setQuery({...query, logo: value})} value = {query.logo}/>
                                                </div>
                                                <div className="col-sm-8">
                                                    <p className="m-b-10 f-w-600">Description</p>
                                                    <Input type="text" id="description" update={(value) => setQuery({...query, description: value})} value = {query.description}/>
                                                </div>


                                                <input className="submit col-4" type="submit" style={{"background": "linear-gradient(to right, #F14616, #000000)"}} value="Create Restaurant"/>

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
export default CreateRestaurant;