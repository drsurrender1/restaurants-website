import React from 'react';
import {Link} from "react-router-dom";

function Card({props}) {
    return(
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 container">
            <div className="col-md-12" id={props.id}>
                <div class="row g-0 border  rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <h1 className="p-4  mb-0 text-muted">{props.name}:</h1>
                    <div className="col p-4 d-flex flex-column position-static ">
                        <strong className="d-inline-block mb-2 text-primary border-danger">New Blog</strong>
                        <h3 className="mb-0">{props.title}</h3>
                        <div className="mb-1 text-muted">{props.time}</div>
                        <p className="card-text mb-auto">{props.content}</p>
                    </div>
                    <img className="img-radius h3 w3" alt={props.name} src={props.logo} />
                    <Link to="/ViewBlog" state={{id: props.id}} className="submit  col-4 white nav-link text-secondary align-c">View</Link>
                </div>
            </div>

        </div>
    );
}

export default Card;