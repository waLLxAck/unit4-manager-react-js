import React from 'react';


const Footer = () => {
    function getCurrentYear() {
        return new Date().getFullYear();
    }

    return (
        // give footer the same color as the navbar
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container text-center">
                <span className="text-muted">© {getCurrentYear()} - <a href="https://svilenpetrov.com">Svilen Petrov</a></span>
            </div>
        </footer>
    )
}

export default Footer;

