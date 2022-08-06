import {useContext, useEffect, useState} from "react";
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";
import axios from "axios"
import axiosInstance from "../../api/index";
import {APIContext} from "../../../Contexts/APIContext";
//import {APIContext} from "../../Contexts/APIContext";

const Table = (props) => {
    //const { notification } = useContext(APIContext)
    const menu = props.menu;
    console.log("menu called")
    console.log(menu)
    return <>

            <div className="container bg-light" >
                <center><div><b>MENU</b></div></center>
                 {menu.map(me => (
                <>

                <b>{me.name}</b>
                <img src={me.images} width="150px" height="120px" className="align-middle float-end"></img>
                    <div className="" >{me.description}</div>
                 <br></br>
                <span className="card-header  rounded bg-opacity-50 bg-secondary">${me.price}</span>
                 <br></br>
                 <br></br>
                 <br></br>

                 <hr></hr></>
                 ))}
                </div>
        <br></br>

    </>}

const Menu = (props) => {
    const rest_id = props.rest_id
    const [menu, setMenu] = useState([])
    //const { setPlayers } = useContext(APIContext)
    const [query, setQuery] = useState({search: '', page: 1, pagesize: 3})
    const [totalPages, setTotalPages] = useState(1)
    //console.log('here')
    useEffect(() => {
        console.log('useEffect invoked')
        console.log( localStorage.getItem('access_token'))
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
        });
        const requestOptions = {
            method: 'GET',
            headers: myHeaders  }

        fetch(`http://127.0.0.1:8000/restaurant/${rest_id}/menu/?search=''&offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
            //console.log(localStorage.getItem('access_token'))
            //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
            .then(response => response.json())
            //.then(console.log(`json=${response.json()}`))
            .then(json => {
                console.log(`json=${json.results}`)
                setMenu(json.results)
                setTotalPages(Math.ceil(json.count/query.pagesize))
            })
    }, [setMenu, query])
    //console.log('here3')
    //console.log(notification)
    console.log("here2")
    return( <>
                {/*<Input title="menu"*/}
                {/*value={query.search}*/}
                {/*update={(value) => setQuery({search: value, page: 1})}/>*/}
                <Table menu={menu}/>
                {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
                {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
                <br></br>
                <hr></hr>
                </>)
}

export default Menu;