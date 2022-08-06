import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ViewBlogComment from "../BlogComments/ViewBlogComment";
import Input from "../../Templates/Input"
// import AddBlogComment from "../BlogComments/AddBlogComment";
// import "./styles.css"


const ViewBlog = (props) => {
    const location = useLocation()
    const { id }= location.state || window.localStorage.getItem('blog_id') || {}
    console.log(id)
    window.localStorage.setItem('blog_id', id)
    console.log(`localstorage ${window.localStorage.getItem('blog_id')}`)
    //const [restaurant, setBlog] = useState();
    const [query, setQuery] = useState({ id: '', restaurant: '', title: '', content: '', images: '', likes: '', time: ''})
    const [flag, setFlag] = useState(0)
    const [comment, setComment] = useState('')
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
    });
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        //body: JSON.stringify(query)
    }
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/blog/${id}/`, requestOptions)
            .then(response => response.json())
            .then(json => {console.log(json)
                //console.log('get fetch called')
                setQuery(json)
            })
    }, [flag])

    return <>
        <form className="container">
            {/*<label id = "Restaurant">Restaurant: {query.restaurant}</label>*/}
            {/*<p className="notification" id="Restaurant_notification"></p>*/}
            {/*<label id = "title">Title: {query.title}</label>*/}
            {/*<p className="notification" id="title_notification"></p>*/}

            {/*<label id = "content">Content: {query.content}</label>*/}
            {/*<p className="notification" id="content_notification"></p>*/}

            {/*<label id = "Image"><img src={query.images}></img></label>*/}
            {/*<p className="notification" id="Image_notification"></p>*/}
            {/*<label id = "Likes">Likes: {query.likes.length}</label>*/}
            {/*<p className="notification" id="Image_notification"></p>*/}
            {/*<label id = "Time">Time: {query.time}</label>*/}
            {/*<p className="notification" id="Time_notification"></p>*/}


            <div className="masthead" >
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="post-heading">
                                <h1>{query.title}</h1>

                                <span className="meta">
                                Posted by {query.restaurant} on {query.time}
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <article className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <p>{query.content}</p>

                            <img className="img-fluid " src={query.images} alt="..."/>

                        </div>
                    </div>
                </div>
            </article>


            {/* TODO modify this */}

            <ViewBlogComment blog_id={id}></ViewBlogComment>
            {/* <Link to="/ViewBlogComments" state={{blog_id: blog.id}} className="btn btn-dark col-2 text-white nav-link text-secondary align-c">Return to Feed</Link> */}
            <div className="row mt-4 mb-4">
                <div className="form-floating">
                    <Input className="form-control ml-1 shadow-none textarea" style={{"height": "12rem"}} placeholder="Enter your message here..." update={(value) => setComment({...query, content: value})}></Input>
                    <label htmlFor="message">Message</label>
                    <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                </div>
                <br/>
                <div className="mt-4  col-2">
                    <button className="btn btn-primary text-uppercase " type="button" onClick={() => {
                        const myHeaders = new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null
                        });
                        const requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(comment)}

                        console.log(JSON.stringify(comment))

                        fetch(`http://127.0.0.1:8000/blog/${id}/comments/add/`,requestOptions)
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

                <Link to="/feed" className="btn btn-black btn-outline-success text-uppercase col-2 mt-4 mb-4">Return to Feed</Link>
            </div>
        </form>


    </>
}
export default ViewBlog;