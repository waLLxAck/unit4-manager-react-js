import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {

    function test() {
        console.log("test");
    }

    const devButton = () => {
        if (window.location.href.includes("localhost")) {
            return (
                <button class="btn btn-primary button-variant" onClick={test}>Dev Button</button>
            )
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link to="/" className="nav-item btn">
                    <a class="navbar-brand" href="#">Unit4</a>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/" className="nav-item btn">
                            <a class="nav-link" href="#">Project Quickstart</a>
                        </Link>
                        <Link to="/tools" className="nav-item btn">
                            <a class="nav-link" href="#">Tools</a>
                        </Link>
                    </ul>
                    <div class="ml-auto"></div>
                    <form class="d-flex">
                        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        {/* if the current URL starts with localhost:3000, display button */}


                        {devButton()}
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
