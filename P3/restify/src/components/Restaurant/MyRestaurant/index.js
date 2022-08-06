import {Link} from "react-router-dom";
import {useState} from "react";
import "./style.css"



const MyRestaurant = () => {
    //const [restaurant, setRestaurant] = useState();
    const [query, setQuery] = useState({name: '',owner:'',phone_number:'',postal_code:'',followers:'',description:'',address:'',likes:'',logo:'' });
    const [flag, setFlag] = useState(0)
    //TODO 抓取用户数据到user中 xxx为用户抓取的信息填充位置
    const getUserInfo = () => {
        if(flag===0){
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
            });
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                //body: JSON.stringify(query)
            };
            fetch('http://127.0.0.1:8000/restaurant/'+localStorage.getItem('restaurant') +'/', requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    setQuery({...query, name: json['name'], owner: json['owner'],
                        phone_number: json['phone_number'], postal_code: json['postal_code'], followers: json['followers'],description: json['description'],
                        likes: json['likes'],logo: json['logo']})
                })
            setFlag(1)
            console.log(query.restaurant)
            // if(query.restaurant){
            //     setRes(true);
            //
            //     console.log("have res")
            // }else{
            //     setRes(false);
            // }
        }
    }
    getUserInfo()
    return <>

        <form style={{"background": "linear-gradient(to bottom, #F14616, #ffffff)"}}>


            <div className="page-content page-container" id="page-content"  onSubmit="return false" >
                <div className="padding">
                    <div className="row  d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-12 user-profile " style={{"background": "linear-gradient(to bottom, #F14616, #ffffff)"}}>
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25"><img
                                                src={query.logo}
                                                className="img-radius" alt="Restaurant Logo"/></div>
                                            <h6 className="f-w-600">{query.name}</h6>
                                            <p>{query.address}</p> <i
                                            className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Restaurant Name</p>
                                                    <h6 className="text-muted f-w-400">{query.name}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Address</p>
                                                    <h6 className="text-muted f-w-400">{query.address}</h6>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Postal Code</p>
                                                    <h6 className="text-muted f-w-400">{query.postal_code}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone Number</p>
                                                    <h6 className="text-muted f-w-400">{query.phone_number}</h6>
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Owner</p>
                                                    <h6 className="text-muted f-w-400">{query.owner}</h6>
                                                </div>



                                                <div className="col-sm-12">
                                                    <p className="m-b-10 f-w-600">Description</p>
                                                    <h6 className="text-muted f-w-400">{query.description}</h6>
                                                </div>


                                            </div>
                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Favorites</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Follower</p>
                                                    <h6 className="text-muted f-w-400">{query.followers.length}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Like</p>
                                                    <h6 className="text-muted f-w-400">{query.likes.length}</h6>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <Link to="/editRestaurant" className="btn btn-white  text-black nav-link text-secondary align-c">Edit Restaurant Profile</Link>
                                        <Link to="/myProfile" className="btn btn-white  text-black nav-link text-secondary align-c">Return to My Profile</Link>

                                        {/*{!res ?<Link to="/createRestaurant" className="btn btn-white  text-black nav-link text-secondary align-c">Create restaurant</Link>:*/}
                                        {/*    <><Link to="/myRestaurant" className="btn btn-white  text-black nav-link text-secondary align-c">My restaurant</Link></>}*/}
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
export default MyRestaurant;