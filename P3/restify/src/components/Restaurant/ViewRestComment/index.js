import {useContext, useEffect, useState, useLocation} from "react";
import Input from "../../Templates/Input";
import Button from "../../Templates/Button";

import {Link, useParams} from "react-router-dom";


const Table = (props) => {

    console.log("props here",props)
    const blogComment = props.blogComment;
    const rest_id = props.rest_id;
    //console.log("table called")
    console.log(blogComment)
    return <div className="">
        {blogComment.map(comm => (
            // <tr key={comm.id}>
            //     <td>{comm.poster}</td>
            //     <td>{comm.content}</td>
            //     <td>{comm.time}</td>
            //     {/* <Link to="/ViewBlog" state={{id: blog.id}}className="btn btn-dark col-2 text-white nav-link text-secondary align-c">View</Link> */}
            // </tr>
            <>
            <div className="bg-white p-2">
            <div className="d-flex flex-row user-info">
                {/*<img className="rounded-circle" src="img/kfc.jpg" width="40"></img>*/}
                <div className="d-flex flex-column justify-content-start ml-2">
                    <span className="d-block font-weight-bold name"> {comm.poster} </span>
                    <span className="date text-black-50">Shared publicly - {comm.time}</span>
                </div>
            </div>
            <div className="mt-2">
            <p className="comment-text">{comm.content}</p>
            </div>
                {comm.poster === window.localStorage.getItem("username")?<button type="button" className="btn btn-primary col-md-1" onClick={() => {
                    const myHeaders = new Headers({
                        //'Content-Type': 'application/json',
                        'Authorization': window.localStorage.getItem('access_token') ? "Bearer " + window.localStorage.getItem('access_token') : null
                    });
                    const requestOptions = {
                        method: 'DELETE',
                        mode: 'cors',
                        headers: myHeaders  }
                    fetch(`http://127.0.0.1:8000/restaurant/${rest_id}/comments/${comm.id}/delete/`,requestOptions)
                        //console.log(localStorage.getItem('access_token'))
                        //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                        .then(response => window.location.reload(false))
                    //.then(console.log(`json=${response.json()}`))
                }}>
                    Delete
                </button>:<></>}
            </div>
            </>

        ))}
        </div>
}

const ViewRestComment = (props) => {
    //const [feed, setViewBlogComment] = useContext(APIContext)
    const rest_id = props.rest_id
    const [blogComment, setBlogComment] = useState([])
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

        fetch(`http://127.0.0.1:8000/restaurant/${rest_id}/comments/?offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
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
    const props1 = {'blogComment':blogComment, 'rest_id':rest_id}
    return (<>

        {/*PageSize:*/}
        {/*<Input title="pagesize"*/}
        {/*       value={query.pagesize}*/}
        {/*       update={(value) => setQuery({page: 1,pagesize: value})}/>*/}
        <Table {...props1}/>

        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    </>)
}

export default ViewRestComment;