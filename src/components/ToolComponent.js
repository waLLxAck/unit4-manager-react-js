import React from 'react';
import { Link } from 'react-router-dom';


function ToolComponent(props) {
    return (
        <div className="col-3 my-2">
            <div className="card h-100">
                <div className="card-body">
                    <img className="card-img-top" src={props.image} alt="Photo by Mika Baumeister on Unsplash" />
                    <h5 className="card-title mt-3">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <Link to={props.link} className="btn btn-primary">Go somewhere</Link>
                </div>
            </div>
        </div>
    )
}

export default ToolComponent;