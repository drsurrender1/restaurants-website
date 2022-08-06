import {Link, Outlet} from "react-router-dom";
import {useState} from "react";
import "../../../bootstrap.min.css"


const Layout = () => {

    function clearToken() {
        console.log('clicked logout')
        window.localStorage.removeItem('access_token')
    }

    if(window.localStorage.getItem('access_token') === 'null' || !window.localStorage.getItem('access_token')){
        console.log(window.localStorage.getItem('access_token'))
        console.log('not logged in')
        return <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Restify</a>
                    <div className=" navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav col ">
                            <li className="nav-item">
                                <a href="/" className="nav-link text-secondary align-c">Home</a>
                            </li>


                        </ul>
                        <form className="d-flex col ">
                            <input className="form-control me-2" type="search" placeholder="Search Restaurant"
                                   aria-label="Search"></input>
                            <button className="btn btn-outline-secondary text-black-50  nav-item" type="submit"><Link to="/search">Search</Link>
                            </button>
                        </form>
                        <ul className="navbar-nav col justify-content-end">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-secondary align-c">Login</Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/signup" className="nav-link text-secondary align-c">Signup</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    }else{
        // console.log(window.localStorage.getItem('access_token'))
        // console.log(typeof(window.localStorage.getItem('access_token')))
        console.log('logged in')
        return <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Restify</a>
                    <div className=" navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav col ">
                            <li className="nav-item">
                                <a href="/" className="nav-link text-secondary align-c">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/feed" className="nav-link text-secondary align-c">Feed</Link>
                            </li>

                        </ul>
                        <form className="d-flex col ">
                            <input className="form-control me-2" type="search" placeholder="Search Restaurant">

                            </input>

                            <button className="btn btn-outline-secondary text-black-50  nav-item" type="submit"><Link to="/search">Search</Link>
                            </button>
                        </form>
                        <ul className="navbar-nav col justify-content-end">
                            <li className="nav-item">
                                <Link to="/myprofile" className="nav-link text-secondary align-c">My Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/notification" className="nav-link text-secondary align-c">Notification</Link>
                            </li>
                            <li className="nav-item ">
                                <a href="/" className="nav-link text-secondary align-c" onClick = {clearToken}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    }


}

export default Layout