import {useContext, useEffect, useState} from "react";
import Input from "../Templates/Input";
import Button from "../Templates/Button";
import axios from "axios"
import axiosInstance from "../api/index";
import {APIContext} from "../../Contexts/APIContext";
import {Link} from "react-router-dom";

const Card = (props) => {
    const notification = props.notification;
    console.log("table called")
    console.log(notification)
    notification.map(noti =>{
        console.log(noti.url)
        if(noti.url[2] === 'b'){
            console.log(`its blog url to blog ${noti.url[12]}`)
            noti.url = ["/ViewBlog", noti.url[12]]
            console.log(noti.url[0])


        }else if(noti.url[2] === 'r'){
            console.log(`its rest url to blog ${noti.url[12]}`)
            noti.url = ["/ViewRestaurant", noti.url[12]]
            console.log(noti.url[0])
            
        }else{
        }
    })

    return <> <card classname = "padding bg-white">
        {notification.map(noti => (
            <>

            <div className="col-sm-8 br3 pa3 ma3 container bg-light rounded mt mt-2" key={noti.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">New Notification</strong>
                        <h3 className="mb-0">Send by {noti.initiator}</h3>
                        <div className="mb-1 text-muted">on {noti.time}</div>
                        <p className="card-text mb-auto">{noti.message}</p>
                        
                        <Link to={noti.url[0]} state={{id: noti.url[1]}} className="nav-link text-secondary align-c" >Read Me</Link>
                    </div>

                </div>
            </div></>
        ))}

    </card></>

}


const Notification = () => {
    const [notification, setNotification] = useState([])
    const [query, setQuery] = useState({ page: 1, pagesize: 5})
    const [totalPages, setTotalPages] = useState(1)
    useEffect(() => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
        });
        const requestOptions = {
            method: 'GET',
            headers: myHeaders  }

        fetch(`http://127.0.0.1:8000/notification/view/all/?offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
            .then(response => response.json())
            .then(json => {
                setNotification(json.results)
                setTotalPages(Math.ceil(json.count/query.pagesize))
            })
    }, [setNotification, query])
    return (<div >
        {/*<Input title="notification" value={query.pagesize} update={(value) => setQuery({...query, pagesize: value})}/>*/}
        <Card notification={notification}/>
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    </div>)
}

export default Notification