import {useContext, useEffect, useState} from "react";
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";
import {Link, useParams} from "react-router-dom";
import React from "react";

//import {APIContext} from "../../Contexts/APIContext";

const Table = (props) => {
    //const { feed } = useContext(APIContext)
    const restaurant = props.restaurant;
    console.log("table called")
    console.log(restaurant)
    
    return <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Phone Number</th>
            <th>Followers</th>
            <th>Likes</th>
        </tr>
        </thead>
        <tbody>
        {restaurant.map(restaurant => (
            // console.log(`restaurant #followers=${restaurant.followers.length}`),
            <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.description}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.postal_code}</td>
                <td>{restaurant.phone_number}</td>
                <td>{restaurant.followers.length}</td>
                <td>{restaurant.likes.length}</td>
                <Link to="/ViewRestaurant" state={{id: restaurant.id}}className="btn btn-dark col-4 text-white nav-link text-secondary align-c">View</Link>
            </tr>
        ))}
        </tbody>
    </table>
    // Link to Tutorial: https://ui.dev/react-router-pass-props-to-link
}

const Card = (props) => {
    //const { feed } = useContext(APIContext)
    const restaurant = props.restaurant;
    console.log("table called")
    console.log(restaurant)
    // const colors = ["bg-primary", "bg-secondary","bg-success","bg-danger","bg-warning", "bg-info"]


    return <card classname = "col-md-12">
        {restaurant.map(restaurant => (


            <div className="card text-white container " key={restaurant.id}>
                <img src={restaurant.logo} className="card-img" alt="..."/>
                    <div className="card-img-overlay col-md-6">
                        <h1 className="display-4 fst-italic">{restaurant.name}</h1>
                        <p className="lead my-3 fw-bold">{restaurant.description}</p>
                        <p className="lead mb-0"><Link to="/ViewRestaurant" state={{id: restaurant.id}} className="text-white fw-bold">Resturant
                            Website</Link></p>

                    </div>
            </div>
        ))}

    </card>
}
const SearchRestaurant = () => {
    const search = window.localStorage.getItem('search')
    const [restaurant, setRestaurant] = useState([])
    const [query, setQuery] = useState({name: '', food: '', address: '', page: 1, pagesize: 5})
    const [totalPages, setTotalPages] = useState(1)
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

        fetch(`http://127.0.0.1:8000/restaurant/search/?&name=${query.name}&food=${query.food}&address=${query.address}&offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`, requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(`json=${json.results}`)
                setRestaurant(json.results)
                setTotalPages(Math.ceil(json.count/query.pagesize))
            })
    }, [query])
    console.log("here2")
    return (<>

        <Card restaurant={restaurant}/>
            Name: <Input title="Search Name"
                         value={query.name}
                         update={(value) => {value ? setQuery({...query, name: value, page: 1}) : setQuery({...query, name: '', page: 1})}}/>
            <br></br>
            Food: <Input title="Search Food"
                         value={query.food}
                         update={(value) => {value ? setQuery({...query, food: value, page: 1}) : setQuery({...query, food: '', page: 1})}}/>
            <br></br>
            Address: <Input title="Search Address"
                            value={query.address}
                            update={(value) => {value ? setQuery({...query, address: value, page: 1}) : setQuery({...query, address: '', page: 1})}}/>
            <br></br>
            PageSize: <Input title="pagesize"
                             value={query.pagesize}
                             update={(value) => setQuery({...query, page: 1,pagesize: value})}/>
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    {/* <Feed/> */}
    </>
    )
}

export default SearchRestaurant;