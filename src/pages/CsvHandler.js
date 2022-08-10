import React from 'react';
import { useEffect } from 'react';
import DropzoneComponent from '../components/DropzoneComponent';


const CsvHandler = () => {
    // text edit area
    const [text, setText] = React.useState('');

    function handleTextChange(e) {
        setText(e.target.value);
        // change size of textarea to fit text
        e.target.style.height = "1px";
        e.target.style.height = (25 + e.target.scrollHeight) + "px";
    }

    // useEffect to change size of textarea to fit text
    useEffect(() => {
        const textArea = document.getElementById("exampleFormControlTextarea1");
        textArea.style.height = "1px";
        textArea.style.height = (25 + textArea.scrollHeight) + "px";
    }, [text]);

    const textArea = () => {
        return (
            <div className="row mt-3">
                <div className="col-12">
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={text}
                        onChange={handleTextChange}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row mb-1">
                <div className="col-12">
                    <h3>CSV Handler</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        {/* window for dropping files with dotted borders */}
                        <DropzoneComponent textAreaFunction={setText} />
                        {textArea()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CsvHandler;