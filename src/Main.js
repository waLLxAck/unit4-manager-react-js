import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Tools from './Tools';
import CsvHandler from './pages/CsvHandler';
import Dev from './pages/Dev';

const Main = () => {
    const homePageUrl = "/";
    const homePageGitHub = '/unit4-manager-react-js';
    const toolsUrl = "/tools";
    const csvHandlerUrl = "/tools/csv-handler";
    const dev = "/dev";
    return (
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
            <Route path={homePageUrl} element={<HomePage />}></Route>
            <Route path={homePageGitHub} element={<HomePage />}></Route>
            <Route path={toolsUrl} element={<Tools />}></Route>
            <Route path={csvHandlerUrl} element={<CsvHandler />}></Route>
            <Route path={dev} element={<Dev />}></Route>
        </Routes>
    );
}

export default Main;