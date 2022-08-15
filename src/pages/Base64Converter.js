import React from 'react';
import { Button } from 'react-bootstrap';

import sampleBinaryString from '../text/sample-binary-string.txt';


const Base64Converter = () => {
    // base64 string state
    const [base64String, setBase64String] = React.useState("");
    const [fileType, setFileType] = React.useState("");
    const [fileExtension, setFileExtension] = React.useState("");

    // usememo for signatures
    const signatures = React.useMemo(() => {
        return {
            // pdf
            "JVBERi0": "application/pdf",

            // gif
            "R0lGODdh": "image/gif",

            // png
            "iVBORw0KGgo": "image/png",

            // jpg
            "/9j/": "image/jpg",

            // image/webp
            "UklGR": "image/webp",

            // xml
            "PD94bWwgdmVyc2lvbj0i": "application/xml",
        }
    }, []);

    // use effect to update file type and extension on base64 string change
    React.useEffect(() => {
        // set file type
        setFileType(() => {
            for (const signature in signatures) {
                if (base64String.startsWith(signature)) {
                    return signatures[signature];
                }
            }
            return "Not supported";
        });
    }, [base64String, signatures]);

    // use effect to update file extension on file type change
    React.useEffect(() => {
        console.log("fileType: " + fileType);
        // set file extension
        setFileExtension(() => {
            // check if file type is null
            if (fileType === "Not supported") {
                return "Not supported";
            }
            const extension = fileType.split("/")[1];
            return extension;
        });
    }, [fileType]);

    // base64 string to be converted to a file
    function base64StringtoFile() {
        // if file type is not found, alert the user
        if (fileType === null) {
            alert("File type not found.");
            return null;
        }

        // generate file name
        const filename = generateRandomName() + "." + fileExtension;

        // decode base64 string
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        // create file
        const file = new File([byteArray], filename, { type: fileType });
        return file;
    }

    function generateRandomName() {
        // generate name from 3 random english words using the random-word npm package
        const randomWords = require('random-words');
        const name = randomWords({ exactly: 3, join: '-' });
        return name;
    }

    return (
        <div className="container">
            {/* bootstrap page layout */}
            <div className="row">
                <div className="col-12">
                    <h4>Base64 to file</h4>
                    <p>Convert base64 to file. Supported types include: {() => {
                        const types = [];
                        for (const signature in signatures) {
                            types.push(signatures[signature]);
                        }
                        return types.join(", ");
                    }}</p>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="base64">Base64</label>
                                <textarea className="form-control" id="base64" rows="3" value={base64String} onChange={(e) => setBase64String(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            <label htmlFor="file-type">File type</label>
                            <input type="text" className="form-control" id="file-type" value={fileType} disabled />
                        </div>
                        <div className="col-6">
                            <label htmlFor="file-extension">File extension</label>
                            <input type="text" className="form-control" id="file-extension" value={fileExtension} disabled />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-auto">
                            <Button variant="success" onClick={() => {
                                // convert base64 string to file
                                const file = base64StringtoFile();

                                console.log(file);

                                // download file
                                var file_url = URL.createObjectURL(file);
                                var file_link = document.createElement("a");

                                console.log(file_url);
                                console.log(file_link);

                                file_link.href = file_url;
                                file_link.download = file.name;
                                console.log(file.name);
                                file_link.click();
                            }}>Decode to file</Button>
                        </div>
                        <div className="col-auto">
                            <Button variant="primary" onClick={() => fetch(sampleBinaryString).then(response => response.text()).then(data => setBase64String(data))}>Sample binary string</Button>
                        </div>
                        <div className="col-auto">
                            <Button variant="primary" onClick={() => {
                                setBase64String("")
                            }}>Clear</Button>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default Base64Converter;