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

const delimiter = ',';

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
        accept: 'text/csv'
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
        <div class="col-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{file.name}</h5>
                    <p class="card-text">{file.size} bytes</p>
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
            const reader = new FileReader();
            reader.onload = (e) => {
                // print header from csv file
                const header = e.target.result.split("\n")[0];
                const fields = header.split(delimiter);

                const newFields = fields.map(field => {
                    // if field is empty, replace with "empty_field"
                    if (field === "") {
                        return "empty_field";
                    }
                    // make lowercase
                    field = field.toLowerCase();
                    // replace spaces with underscores
                    field = field.replace(/ /g, "_");
                    // remove special characters
                    field = field.replace(/[^a-zA-Z0-9]/g, '');
                    // remove numbers
                    field = field.replace(/[0-9]/g, '');

                    return field;
                }).filter(field => field !== "");

                var liquidScript = ''

                newFields.forEach(field => {
                    // get field index
                    const index = newFields.indexOf(field);
                    const liquid = `{%- assign ${field} = header_item[${index}] -%}\n`;
                    liquidScript += liquid;
                });

                // set text area to liquid script
                props.textAreaFunction(liquidScript);

            }
            reader.readAsText(file);
        })
    }, [files]);

    return (
        <section>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div>Drag and drop your csv file here. Or click to attach a file.</div>
            </div>
            <aside>
                <div class="row mt-3">
                    {thumbs}
                </div>
            </aside>
        </section>
    )
}

export default DropzoneComponent;