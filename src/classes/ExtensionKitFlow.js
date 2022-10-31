class ExtensionKitFlow {
    constructor(flowJson) {
        this.flowJson = flowJson;
        this.flowTriggerDescripton = '';
        this.tableData = [];
        this.flowJsonIsLoaded = false;
        this.smallDescriptionTextArea = '';
        this.loadFlow();
    }
}
