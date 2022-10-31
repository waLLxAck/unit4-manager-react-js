import React, { useEffect } from 'react';
import DropzoneComponent from '../components/ExtensionKitDocumentationDropzone';
import ExtensionKitFlow from '../classes/ExtensionKitFlow';


const Dev = () => {
    const [flowJson, setFlowJson] = React.useState({});
    const [flowJsonIsLoaded, setFlowJsonIsLoaded] = React.useState(false);
    const [smallDescriptionTextArea, setSmallDescriptionTextArea] = React.useState('');
    const [displayedValue, setDisplayedValue] = React.useState('');
    const [tableData, setTableData] = React.useState([]);
    const [flowTriggerDescripton, setFlowTriggerDescripton] = React.useState('');

    function handleTextChange(e) {
        setDisplayedValue(e.target.value);
    }

    // // use ExtensionKitFlow class
    // const extensionKitFlow = new ExtensionKitFlow(flowJson);

    // set flowJsonIsLoaded to true when the flowJson is loaded and is not empty
    useEffect(() => {
        if (flowJson && Object.keys(flowJson).length > 0) {
            setFlowJsonIsLoaded(true);
        }
    }, [flowJson]);

    // if flowJsonIsLoaded is true, set the tableData
    useEffect(() => {
        if (flowJsonIsLoaded) {
            console.log(flowJson);
            adjustSize();
            setImportStatus();
            processFlowTriggerDescription();
        }
    }, [flowJsonIsLoaded]);

    // if flowTriggerDescripton changes, generate table again
    useEffect(() => {
        if (flowTriggerDescripton) {
            generateTable();
        }
    }, [flowTriggerDescripton]);

    function setImportStatus() {
        var smallNote = ''
        var color = ''
        if (Object.keys(flowJson).length !== 0) {
            if (Object.keys(flowJson).includes('FlowDefinitions')) {
                smallNote = 'Extension Kit flow detected.'
                color = 'text-success'
            } else {
                console.log(flowJson);
                smallNote = 'Error. Unable to detect Extension Kit flow.'
                color = 'text-danger'
            }
            setSmallDescriptionTextArea(<small className={`form-text ${color}`}>{smallNote}</small>)
        }
    }

    function adjustSize() {
        const textArea = document.getElementById("exampleFormControlTextarea1");
        // if flowJson is not empty
        if (Object.keys(flowJson).length !== 0) {
            //set height of textArea to 500px
            textArea.style.height = "300px";
        } else {
            //set height of textArea to 1px
            textArea.style.height = "1px";
        }
    }

    const textArea = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={displayedValue}
                        onChange={handleTextChange}
                    />
                </div>
            </div>
        )
    }

    function getFlowSteps() {
        const actions = flowJson.FlowDefinitions[0].Actions;
        // if any of the actions is a for-each, get the steps from the for-each
        const substepItems = []
        const steps = actions.map(step => {
            const stepType = getStepType(step);
            if (stepType === 'for-each') {
                const properties = step.Input.Properties
                // check if any of the properties is a for-each, if so, get the steps from the for-each
                properties.forEach(property => {
                    if (property.Name === 'RawProperty__Actions') {
                        substepItems.push(...property.Items);
                    }
                });
            }
            return step
        })
        return [...steps, substepItems]
    }

    function getStepNames(steps, counter = 0, isSubstep = false, counterIncrement = 1) {
        if (isSubstep) {
            counterIncrement = 0.1
        }
        const stepNames = steps.map(step => {
            // increment counter by counterIncrement, round to 2 decimal places
            counter = Math.round((counter + counterIncrement) * 100) / 100;
            return getStepName(step, counter, isSubstep)
        })
        return stepNames
    }

    function getStepName(step, counter, isSubstep, prefix = 'step') {
        if (isSubstep) {
            prefix = '  substep'
        }

        // check if step is not an array
        if (!Array.isArray(step)) {
            const label = step.Label
            if (label) {
                // remove all numbers at the beginning of the label
                const labelWithoutNumber = label.replace(/^\d+/, '');
                // remove all dots and whitespace at the beginning of the label
                const labelWithoutNumberAndDots = labelWithoutNumber.replace(/^\.*\s*/, '');
                return `${prefix}${counter}. ${labelWithoutNumberAndDots}`
            } else {
                const type = getStepType(step)
                const name = getNameFromType(type)
                return `${prefix}${counter}. ${name}`
            }
        } else {
            // if step is an array, it is a substep
            const substepNames = getStepNames(step, counter - 1, true)
            return substepNames.join('\r')
        }
    }

    function getStepType(step) {
        return step.Type
    }

    function getNameFromType(type) {
        switch (type) {
            case 'json-parse':
                return 'JSON Parse'
            case 'for-each':
                return 'For Each Loop'
            case 'execute-templating-script':
                return 'Templating Script'
            case 'stop':
                return 'Stop Action'
            case 'email':
                return 'Send Email'
            case 'http-request':
                return 'HTTP Request'
            default:
                return type
        }
    }

    function getFlowTrigger() {
        const trigger = flowJson.FlowDefinitions[0].Trigger;
        return trigger
    }

    function processFlowTriggerDescription() {
        const flowTrigger = getFlowTrigger()
        const flowTriggerType = getStepType(flowTrigger)
        console.log(flowTriggerType);
        switch (flowTriggerType) {
            case 'http-webhook':
                setFlowTriggerDescripton('Allows a flow to be initiated based on a HTTP request. Response can be customized to subscribe a flow to an event source system.')
                break
            case 'http-webhook-with-parameters':
                // changeme
                setFlowTriggerDescripton('')
                break
            case 'http-webhook-with-parameters-and-custom-response':
                // changeme
                setFlowTriggerDescripton('')
                break
            default:
                // changeme
                setFlowTriggerDescripton('')
        }
    }

    function generateTable() {
        const steps = getFlowSteps();
        const stepNames = getStepNames(steps);
        setTableData(
            <table id="stepsTable" className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Step #</th>
                        <th scope="col">Step Name</th>
                        <th scope="col">Step Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">0</th>
                        <td>Webhook (v2)</td>
                        <td>{flowTriggerDescripton}</td>
                    </tr>
                    {stepNames.map((stepName, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{stepName}</td>
                                <td>changeme</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    function toggleTableEdit() {
        const table = document.getElementById("stepsTable");
        if (table) {
            table.contentEditable = table.contentEditable === "true" ? false : true
        }
    }

    return (
        <div className="container">
            <h1 className="display-4">Extension Kit Documentation Generator</h1>
            <hr />
            <small className="text-muted">
                <p>
                    This tool will help you generate Extension Kit documentation.
                </p>
            </small>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        {/* window for dropping files with dotted borders */}
                        <DropzoneComponent textAreaFunction={setFlowJson} />
                        {smallDescriptionTextArea}
                    </div>
                    <div className="form-group mt-3">
                        {textArea()}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {tableData}
                        </div>
                        <div className="col-12 mt-2">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary" onClick={toggleTableEdit}>Edit Table</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dev;