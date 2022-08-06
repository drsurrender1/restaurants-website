import {useContext, useEffect, useState} from "react";
import Input from "../../Templates/Input";
import Button from "../../Templates/Button"
import AddFood from "../AddFood";
import {Link} from "react-router-dom";


const Table = (props) => {
    //const { notification } = useContext(APIContext)
    const menu = props.menu;
    console.log("menu called")
    console.log(menu)
    return <table>
        <thead>
        <tr>
            <th>image</th>
            <th>name</th>
            <th>description</th>
            <th>price</th>
            <th>restaurant</th>
        </tr>
        </thead>
        <tbody>
        {menu.map(me => (
            <tr key={me.id}>
                <td> <img src={me.images} border="3" height="100" width="100" /> </td>
                <td>{me.name}</td>
                <td>{me.description}</td>
                <td>{me.price}</td>
                <td>{me.restaurant}</td>
                <td><button className=" btn col-2 mt-4 mb-4"  onClick={() => {
                    const myHeaders = new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
                    });
                    const requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders  }

                    fetch(`http://127.0.0.1:8000/restaurant/${localStorage.getItem('restaurant')}/menu/${me.id}/delete/`,requestOptions)
                        //console.log(localStorage.getItem('access_token'))
                        //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                        .then(response => window.location.reload(false))
                        //.then(console.log(`json=${response.json()}`))
                        }}> Delete</button></td>
                <td><Link to="/EditFood" state={{id: me.id}} className="btn  text-uppercase col-2 mt-4 mb-4 " >Edit</Link></td>

            </tr>
        ))}
        </tbody>
    </table>
}

const EditMenu = () => {
    //const [notification, setNotification] = useContext(APIContext)
    const [menu, setMenu] = useState([])
    //const { setPlayers } = useContext(APIContext)
    const [query, setQuery] = useState({ page: 1, pagesize: 10})
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

        fetch(`http://127.0.0.1:8000/restaurant/${localStorage.getItem('restaurant')}/menu/?offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
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
    return (<div className="row padding col-md-12">

        <AddFood/>
        {/*Pagesize: <Input title="menu"*/}
        {/*                 value={query.search}*/}
        {/*                 update={(value) => setQuery({pagesize: value, page: 1})}/>*/}
        <Table menu={menu}/>
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    </div>)
}

export default EditMenu;