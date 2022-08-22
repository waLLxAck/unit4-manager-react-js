import React, { useEffect } from 'react';

const Dev = () => {
    const [json_object, setJsonObject] = React.useState(null);
    const [liquid_code, setLiquidCode] = React.useState("");

    useEffect(() => {
        // try parse json
        try {
            JSON.parse(json_object);
            setLiquidCode(printLiquidCodeFromJson(json_object, ''))
        } catch (e) {
            setLiquidCode("");
        }

    }, [json_object]);

    const handleJsonChange = (e) => {
        try {
            setJsonObject(JSON.parse(e.target.value));
        }
        catch (e) {
            setJsonObject("Invalid JSON");
        }
    }

    let liquid_code_string = ""

    // function that prints all the keys of the json object and their respective paths starting from the root
    function printLiquidCodeFromJson(json, path) {
        for (let key in json) {
            if (Object.prototype.toString.call(json[key]) === "[object Array]") {
                // get the first element of the array
                let firstElement = json[key][0];
                printLiquidCodeFromJson(firstElement, `${path}["${key}"][0]`);
            } else if (typeof json[key] === "object") {
                printLiquidCodeFromJson(json[key], `${path}["${key}"]`);
            } else {
                console.log("----------------------------------------------------");
                liquid_code_string += `{%- assign ${key} = json_object${path}["${key}"] -%}\n`
            }
        };
        return liquid_code_string;
    }

    return (
        <div className="container">
            {/* title, input text area, button with on click - execute printLiquidCodeFromJson function on json text from text area */}
            <h1 className="display-4">Liquid Code Generator</h1>
            <hr />
            <small className="text-muted">
                <p>
                    This tool will generate liquid code from a json object.
                </p>
                <p>
                    The generated liquid code will be displayed in the text area below.
                </p>
            </small>
            <div className="form-group">
                <label htmlFor="json-textarea">JSON Text</label>
                <textarea className="form-control" id="json-textarea" rows="10" onChange={handleJsonChange}></textarea>
            </div>
            <button className="btn btn-primary" onClick={() => console.log(json_object)}>Execute</button>
            <div className="form-group">
                <label htmlFor="liquid-code-textarea">Liquid Code</label>
                <textarea className="form-control" id="liquid-code-textarea" rows="10" value={liquid_code}></textarea>
            </div>
        </div>
    );
}

export default Dev;