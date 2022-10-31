import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropzoneComponent(props) {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'application/json'
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div className="col-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{file.name}</h5>
                    <p className="card-text">{file.size} bytes</p>
                </div>
            </div>
        </div>
    ));

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        files.forEach(file => {
            // display file contents in text area
            const reader = new FileReader();
            reader.onload = function (e) {
                // try convert to JSON
                try {
                    const json = JSON.parse(e.target.result);
                    props.textAreaFunction(json);
                } catch (e) {
                    console.log(e);
                    // send error to parent as an object
                    props.textAreaFunction({ error: e });
                }
            }
            reader.readAsText(file);
        });
    }, [files]);

    return (
        <section>
            <div className="mb-3" {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div>Drag and drop your Extension Kit flow JSON here. Or click to attach a file.</div>
            </div>
            <aside>
                {/* if 'thumbs' isn't empty */}
                {thumbs.length > 0 && <div className="row mb-3">{thumbs}</div>}
            </aside>
        </section>
    )
}

export default DropzoneComponent;