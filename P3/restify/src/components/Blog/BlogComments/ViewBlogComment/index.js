import {useContext, useEffect, useState, useLocation} from "react";
import Input from "../../../Templates/Input";
import Button from "../../../Templates/Button";
import {Link, useParams} from "react-router-dom";


const Table = (props) => {
    //const { feed } = useContext(APIContext)
    const blogComment = props.blogComment;
    const blog_id = props.blog_id;
    //console.log("table called")
    console.log(blogComment)
    return <>

        {blogComment.map(comm => (
            <div className="col-sm-12 br3 pa3 ma3  bg-light rounded mt" key={comm.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm  position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{comm.poster}: </strong>
                        <h3 className="mb-0">{comm.content}</h3>
                        <div className="mb-1 text-muted">Post on {comm.time}</div>
                        {/*<button type="button" className="btn btn-primary col-md-1" style={{"margin-left":"83%"}}>*/}
                        {/*    read*/}
                        {/*</button>*/}
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
                        fetch(`http://127.0.0.1:8000/blog/comment/${comm.id}/delete/`,requestOptions)
                            //console.log(localStorage.getItem('access_token'))
                            //axiosInstance.get(`http://127.0.0.1:8000/notification/view/all/?page=1`,{ headers: { Authorization: localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null, } })
                            .then(response =>console.log(response))

                        //.then(console.log(`json=${response.json()}`))
                    }}>
                        Delete
                    </button>:<></>}

                </div>
            </div>
        ))}



    </>
}

const ViewBlogComment = (props) => {
    //const [feed, setViewBlogComment] = useContext(APIContext)
    const blog_id = props.blog_id
    const [blogComment, setBlogComment] = useState([])
    //const { setPlayers } = useContext(APIContext)
    const [query, setQuery] = useState({search: '', page: 1, pagesize: 50})
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

        fetch(`http://127.0.0.1:8000/blog/${blog_id}/comments/?offset=${(query.page-1) * query.pagesize}&limit=${query.pagesize}`,requestOptions)
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
    const props1 = {'blogComment':blogComment, 'blog_id':blog_id}
    return (<>
        <p>Comment: </p>
        {/*<Input title="pagesize"*/}
        {/*       value={query.pagesize}*/}
        {/*       update={(value) => setQuery({page: 1,pagesize: value})}/>*/}
        <Table {...props1}/>
        {query.page > 1 ? <Button value="prev" update={() => setQuery({...query, page: query.page - 1})} /> : <></>}
        {query.page < totalPages ? <Button value="next" update={() => setQuery({...query, page: query.page + 1})} /> : <></>}
    </>)
}

export default ViewBlogComment;