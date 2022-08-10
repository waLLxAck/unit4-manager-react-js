import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Tools from './Tools';
import CsvHandler from './pages/CsvHandler';

const Main = () => {
    const homePageUrl = "/";
    const toolsUrl = "/tools";
    const csvHandlerUrl = "/tools/csv-handler";
    return (
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
            <Route path={homePageUrl} element={<HomePage />}></Route>
            <Route path={toolsUrl} element={<Tools />}></Route>
            <Route path={csvHandlerUrl} element={<CsvHandler />}></Route>
        </Routes>
    );
}

export default Main;