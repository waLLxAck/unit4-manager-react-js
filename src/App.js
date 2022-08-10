import React from 'react';
import Main from './Main';
import NavBar from './NavBar';
import Footer from './Footer';

const App = () => {
    return (
        <div className="App">
            <NavBar />
            <div className="container mt-5">
                <Main />
            </div>
            <Footer />
        </div>
    );
}

export default App;