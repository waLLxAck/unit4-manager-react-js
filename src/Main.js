import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Tools from './Tools';
import CsvHandler from './pages/CsvHandler';
import Dev from './pages/Dev';
import Base64Converter from './pages/Base64Converter';
import JsonToLiquidVariables from './pages/JsonToLiquidVariables';

const Main = () => {
    const homePageUrl = "/";
    const homePageGitHub = '/unit4-manager-react-js';

    // tools
    const toolsUrl = "/tools";
    const csvHandlerUrl = "/tools/csv-handler";
    const base64Converter = "/tools/base64-converter";
    const jsonToLiquidVariables = "/tools/json-object-to-liquid-variables";

    const dev = "/dev";
    return (
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
            <Route path={homePageUrl} element={<HomePage />}></Route>
            <Route path={homePageGitHub} element={<HomePage />}></Route>

            {/* tools */}
            <Route path={toolsUrl} element={<Tools />}></Route>
            <Route path={csvHandlerUrl} element={<CsvHandler />}></Route>
            <Route path={base64Converter} element={<Base64Converter />}></Route>
            <Route path={jsonToLiquidVariables} element={<JsonToLiquidVariables />}></Route>

            <Route path={dev} element={<Dev />}></Route>
        </Routes>
    );
}

export default Main;