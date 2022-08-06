import {useContext, useEffect, useState, useLocation, localStorage} from "react";
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";

import {Link, useParams} from "react-router-dom";


const Table = (props) => {
    //const { feed } = useContext(APIContext)
    const blogComment = props.blogComment;
    const owner = props.owner
    //console.log("table called")
    console.log(blogComment)
    console.log(owner)



    return<>
    <div className="bg-white p-2">
        {blogComment.map(comm => (
            // <tr key={comm.id}>
            //     <td>{comm.poster}</td>
            //     <td>{comm.content}</td>
            //     <td>{comm.time}</td>
            //     {/* <Link to="/ViewBlog" state={{id: blog.id}}className="btn btn-dark col-2 text-white nav-link text-secondary align-c">View</Link> */}
            // </tr>
            <>
            <div className="container">
                <div className="col-6 row" style={{"margin-left": "25%"}}>
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className=" p-4 d-flex flex-column position-static row">
                            <strong className="d-inline-block mb-2 text-success">New Blog!!!</strong>
                            <Link to="/viewBlog" state ={{id: comm.id}} className="nav-item"><h3 className="mb-0">{comm.title}</h3></Link>

                            <div className="mb-1 text-muted">post on {comm.time}</div>
                            <p className="card-text mb-auto">{comm.content}</p>

                        </div>
                        <div> <button type="button" className="btn btn-primary col-2 m-lg-3" onClick={() => {
                            const myHeaders = new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
                            });
                            const requestOptions = {
                                method: 'POST',
                                headers: myHeaders  }

                            fetch(`http://127.0.0.1:8000/blog/${comm.id}/like/`,requestOptions)
                                //console.log(localStorage.getItem('access_token'))
                                //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                                .then(response => response.json())
                                //.then(console.log(`json=${response.json()}`))
                                .then(json => {
                                    console.log(`json=${json}`)
                                    window.location.reload(false)
                                    // setTotalPages(json.meta.total_pages)
                                })}}>
                            Like <span className="badge bg-secondary">{comm.likes.length}</span>
                        </button>
                            {owner?<button type="button" className="btn btn-danger col-2" style={{"margin-left": "50%"}} onClick={() => {
                                const myHeaders = new Headers({
                                    //'Content-Type': 'application/json',
                                    'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
                                });
                                const requestOptions = {
                                    method: 'DELETE',
                                    mode: 'cors',
                                    headers: myHeaders  }
                                fetch(`http://127.0.0.1:8000/blog/${comm.id}/delete/`,requestOptions)
                                    //console.log(localStorage.getItem('access_token'))
                                    //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                                    .then(response => window.location.reload(false))
                                    //.then(console.log(`json=${response.json()}`))
                                    }}>
                                Delete
                            </button>:<></>}</div>
                        <div className="card text-white ">
                            <img src={comm.images} className="card-img" style={{"width":"100%", "height":"auto"}} alt="..."></img>
                        </div>
                    </div>
                </div>
            </div>
            </>

        ))}
        </div>
            </>
}

const ViewAllBlog = (props) => {
    //const [feed, setViewBlogComment] = useContext(APIContext)
    const rest_id = props.rest_id
    const [blogComment, setBlogComment] = useState([])
    //const { setPlayers } = useContext(APIContext)
    const [query, setQuery] = useState({search: '', page: 1, pagesize: 3})
    const [owner, setOwner] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    //console.log('here')
    useEffect(() => {
        if(window.localStorage.getItem('restaurant') === rest_id){
            setOwner('1');
            console.log('is owner')
        }

        console.log('useEffect invoked')
        console.log( window.localStorage.getItem('access_token'))
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
        });
        const requestOptions = {
            method: 'GET',
            headers: myHeaders  }

        fetch(`http://127.0.0.1:8000/restaurant/${rest_id}/blogs/?offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
            .then(response => response.json())
            //.then(console.log(`json=${response.json()}`))
            .then(json => {
                console.log(`json=${json.results}`)
                setBlogComment(json.results)
                setTotalPages(Math.ceil(json.count/query.pagesize))
            })
    }, [query])
    //console.log('here3')
    //console.log(feed)
    console.log("here2")
    props = {
        'blogComment': blogComment,
        'owner': owner
    }
    return (<>
        {/*PageSize:*/}
        {/*<Input title="pagesize"*/}
        {/*       value={query.pagesize}*/}
        {/*       update={(value) => setQuery({page: 1,pagesize: value})}/>*/}
        <Table {...props}/>
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    </>)
}

export default ViewAllBlog;