import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import "./style.css"
import Input from "../../Templates/Input";
import ViewRestComment from '../ViewRestComment';
import ViewBlog from "../../Blog/ViewBlog";
import ViewAllBlog from "../../Blog/ViewAllBlog";
import Menu from "../Menu";

const ViewRestaurant = () => {
    const location = useLocation()
    const { id }= location.state

    //console.log(id)
    //console.log(prop[id])
    //const [restaurant, setRestaurant] = useState();
    const [query, setQuery] = useState({name: '',owner:'',phone_number:'',postal_code:'',followers:'',description:'',address:'',likes:'',logo:'' });
    const [flag, setFlag] = useState(0)
    const [user, setUser] = useState({username: '', avatar: null})
    const [comment, setComment] = useState({content: ''})
    const [owner, setOwner] = useState(null)

    const getUserInfo = () => {
        if(flag===0){
            console.log("id",localStorage.getItem('restaurant'))
            console.log("1",id)
            if(id === localStorage.getItem('restaurant')){
                setOwner(12)
                console.log("ownerhere",owner)
            }
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
            });
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                //body: JSON.stringify(query)
            };

            fetch(`http://127.0.0.1:8000/restaurant/${id}/`, requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    setQuery(json)
                })
            fetch(`http://127.0.0.1:8000/accounts/profile/${localStorage.getItem('uid')}/edit/`, requestOptions)
                .then(response => response.json())
                .then(json => {console.log(json)
                    console.log('get fetch called')
                    setUser({...query, username: json['username'], avatar: json['avatar'],
                    })
                })
            setFlag(1)
        }
    }
    getUserInfo()
    return (<>

        <body className="padding bg-white" >
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-black row">
            <div className="col-md-6 px-0">
                <h1 className="display-4 fst-italic"> {query.name}</h1>
                <p className="lead my-3" id='likecount'> {query.followers.length}</p> <p>followers</p>
                <p className="lead my-3" id='likecount1'> {query.likes.length} </p> <p>likes</p>
                <button class="fa fa-heart-o mr-2" onClick={() => {
                    const myHeaders = new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
                    });
                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders  }
                    const like  = document.querySelector('#likecount');
                    //console.log("likecount")
                    //console.log(like)
                    console.log(parseInt(like.innerText)+1)
                    fetch(`http://127.0.0.1:8000/restaurant/${id}/follow/`,requestOptions)
                        //console.log(localStorage.getItem('access_token'))
                        //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                        .then(response =>
                            response.json())
                        //.then(console.log(`json=${response.json()}`))
                        .then(response => {
                            console.log(`json=${response}`)
                            if(response === 'add follow'){
                                like.innerText = parseInt(like.innerText)+1
                            }else{like.innerText = parseInt(like.innerText)-1}
                        })}}>follow</button>
                <button class="fa fa-heart-o mr-2" onClick={() => {
                    const myHeaders = new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
                    });
                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders  }
                    const like1 = document.querySelector('#likecount1');
                    fetch(`http://127.0.0.1:8000/restaurant/${id}/like/`,requestOptions)
                        //console.log(localStorage.getItem('access_token'))
                        //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                        .then(response => response.json())
                        //.then(console.log(`json=${response.json()}`))
                        .then(json => {
                            console.log(`json=${json}`)
                            if(json === 'add like'){
                                like1.innerText = parseInt(like1.innerText)+1
                            }else{like1.innerText = parseInt(like1.innerText)-1}
                        })}}>like</button>

            </div>
            <div className="col-md-6 " style={{"margin-top":"130px"}}>
                <div className="col-md-12 ">Our Address: {query.address}</div>
                <div className="col-md-12 ">Postal Code: {query.postal_code}</div>
                <div className="col-md-12 ">Phone Number: {query.phone_number}</div>
            </div>
        </div>

        <div className="content" >

            <div className="row align-items-center col-12 " id="about">
                <div className="col-6">
                    <img src={query.logo} className="col-12" alt="logo"
                         />
                </div>

                <div className="col-6 ">
                    <h1 className="">About us</h1>

                    <p className="">{query.description}</p>

                </div>
            </div>
        </div>
        <br/>
        {owner?<Link to="/editMenu" className="btn btn-white  text-black nav-link text-secondary align-c">Edit Menu</Link>:<></>}
        <Menu rest_id={id}></Menu>
        {owner?<Link to="/addBlog" className="btn btn-white  text-black nav-link text-secondary align-c">Add Blog</Link>:<></>}
        <ViewAllBlog rest_id={id}></ViewAllBlog>
        <ViewRestComment rest_id={id}></ViewRestComment>
        <div className="bg-light p-2">
            <div className="d-flex flex-row user-info">
                <img className="rounded-circle" src={user.avatar} width="40"></img>
                <Input className="form-control ml-1 shadow-none textarea" update={(value) => setComment({...query, content: value})}></Input>
            </div>
            <div className="mt-2 text-right">
                <button className="btn btn-primary btn-sm shadow-none" type="button" onClick={() => {
                    const myHeaders = new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
                    });
                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(comment)}

                    console.log(JSON.stringify(comment))

                    fetch(`http://127.0.0.1:8000/restaurant/${id}/comments/add/`,requestOptions)
                        //console.log(localStorage.getItem('access_token'))
                        //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                        .then(response => response.json())
                        //.then(console.log(`json=${response.json()}`))
                        .then(json => {
                            console.log(`json=${json}`)
                            // setTotalPages(json.meta.total_pages)
                            window.location.reload(false)

                        })}}>Post comment</button>

            </div>
        </div>
        </body>
    </>)
}
export default ViewRestaurant;