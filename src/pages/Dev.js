import React from 'react';

import { useState } from 'react';


const Dev = () => {
    // useState that stores a jsonString that is converted to an object
    const [jsonString, setJsonString] = useState("");

    // create a textarea for the user to input a json string
    const jsonTextArea = <textarea id="jsonTextArea" rows="10" cols="50" value={jsonString} onChange={e => setJsonString(e.target.value)}></textarea>;

    // create a textarea that displays the json object


    return (
        <div class="container">
            {/* bootstrap page layout */}
            <div class="row">
                <div class="col-12">
                    <h3>The developer page</h3>
                    <p>Here is where I will be developing new features.</p>
                </div>

            </div>
            <div class="row">
                <div class="col-12">
                    <h4>JSON String to Object</h4>
                    <p>Enter a JSON string below and it will be converted to an object.</p>
                    {jsonTextArea}
                </div>
            </div>
        </div>
    )
}

export default Dev;