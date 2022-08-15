import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavBar = () => {

    function test() {
        console.log("test");
    }

    const devButton = () => {
        if (window.location.href.includes("localhost")) {
            return (
                <Link to="/dev" className="nav-link" ><button class="btn btn-primary button-variant" onClick={test}>Dev Button</button></Link>
            )
        }
    }

    // change the color of the active link
    const activeStyle = { color: "orange" };

    return (
        <>
            <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" >Unit4</Link>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Nav.Item className="navbar-nav">
                            <Nav.Link>
                                <Link to="/" className="nav-link" activeStyle={activeStyle}>Project Quickstart</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navbar-nav">
                            <Nav.Link>
                                <Link to="/tools" className="nav-link" activeStyle={activeStyle}>Tools</Link>
                            </Nav.Link>
                        </Nav.Item>
                        {devButton()}
                    </div>
                </div>
            </Nav>
        </>
    );
}

export default NavBar;
