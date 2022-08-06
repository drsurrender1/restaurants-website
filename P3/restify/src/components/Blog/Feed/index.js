import {useContext, useEffect, useState} from "react";
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";
import {Link, useParams} from "react-router-dom";
import React from 'react';

//import {APIContext} from "../../Contexts/APIContext";

const Table = (props) => {
    //const { feed } = useContext(APIContext)
    const feed = props.feed;
    console.log("table called")
    console.log(feed)
    return <table className="col-md-12">
        <thead>
        <tr>
            <th>initiator</th>
            <th>Blog Title</th>
            <th>Blog Content</th>
            <th>time</th>
            <th>image</th>
        </tr>
        </thead>
        <tbody>
        {feed.map(blog => (

            <tr key={blog.id}>
                <td>{blog.restaurant}</td>
                <td>{blog.title}</td>
                <td>{blog.content}</td>
                <td>{blog.time}</td>
                <td><img src={blog.images}></img></td>
                <Link to="/ViewBlog" state={{id: blog.id}} className="nav-link text-secondary align-c" >view</Link>

            </tr>
        ))}
        </tbody>
    </table>
}

const Card = (props) => {
    //const { feed } = useContext(APIContext)
    const feed = props.feed;
    console.log("table called")
    console.log(feed)
    // const colors = ["bg-primary", "bg-secondary","bg-success","bg-danger","bg-warning", "bg-info"]


    return <card classname = "col-md-12 bg-white">
        {feed.map(blog => (
            <div className="container">
                <div className="col-6 row" style={{"margin-left": "25%"}}>
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className=" p-4 d-flex flex-column position-static row">
                            <strong className="d-inline-block mb-2 text-success">New Blog!!!</strong>
                            <Link to="/viewBlog" state ={{id: blog.id}} className="nav-item"><h3 className="mb-0">{blog.title}</h3></Link>

                            <div className="mb-1 text-muted">{blog.restaurant} post on {blog.time}</div>
                            <p className="card-text mb-auto">{blog.content}</p>

                        </div>
                        <div> <button type="button" className="btn btn-primary col-2 m-lg-3" onClick={() => {
                            const myHeaders = new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
                            });
                            const requestOptions = {
                                method: 'POST',
                                headers: myHeaders  }

                            fetch(`http://127.0.0.1:8000/blog/${blog.id}/like/`,requestOptions)
                                //console.log(localStorage.getItem('access_token'))
                                //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                                .then(response => response.json())
                                //.then(console.log(`json=${response.json()}`))
                                .then(json => {
                                    console.log(`json=${json}`)
                                    window.location.reload(false)
                                    // setTotalPages(json.meta.total_pages)
                                })}}>
                            Like <span className="badge bg-secondary">{blog.likes.length}</span>
                        </button>
                            </div>
                        <div className="card text-white ">
                            <img src={blog.images} className="card-img" style={{"width":"100%", "height":"auto"}} alt="..."></img>
                        </div>
                    </div>
                </div>
            </div>
        ))}

    </card>
}

const Feed = () => {
    //const [feed, setFeed] = useContext(APIContext)
    const [feed, setFeed] = useState([])
    //const { setPlayers } = useContext(APIContext)
    const [query, setQuery] = useState({search: '', page: 1, pagesize: 10})
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

        fetch(`http://127.0.0.1:8000/blog/feed/?search='${query.search}'&offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
            .then(response => response.json())
            //.then(console.log(`json=${response.json()}`))
            .then(json => {
                console.log(`json=${json.results}`)
                setFeed(json.results)
                setTotalPages(Math.ceil(json.count/query.pagesize))
            })
    }, [setFeed, query])
    //console.log('here3')
    //console.log(feed)
    console.log("here2")
    return (<div className="col-md-12 bg-white mb-1">
        <Card feed={feed}/>
        {query.page > 1 ? <Button style = {{"margin-left":"40%"}} className ="btn btn-outline-light submit" value="Prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button className ="btn btn-outline-light submit " value="Next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
        {/*<div className="col-md-8">*/}
        {/*    <p className="m-b-10 f-w-600">Page Size</p>*/}
        {/*    <Input placeholder="pagesize"*/}
        {/*           value={query.pagesize}*/}
        {/*           update={(value) => setQuery({page: 1,pagesize: value})}*/}
        {/*    />*/}
        {/*</div>*/}
    </div>)
}

export default Feed;