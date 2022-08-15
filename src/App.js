import React from 'react';
import Main from './Main';
import NavBar from './NavBar';
import Footer from './Footer';

const App = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavBar />
            <div className="container mt-3">
                <Main />
            </div>
            <Footer />
        </div>
    );
}

export default App;