import React, { Component } from 'react'
import Auth from './Auth.js'

class Environment extends Component {
    constructor(props) {
        super(props);
        this.environmentName = props.environmentName;
        this.id = 0;
    }

    render() {
        return (
            <>
                <div class="mb-2 justify-content-center">
                    <label for={this.environmentName} id={this.environmentName} >{this.environmentName}</label>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-extension-kit"} placeholder="Extension Kit URL" />
                    <small class="form-text text-muted">e.g. https://s-au-ek1-preview-portal.unit4cloud.com/tenant/u4erx-u4a-prev</small>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-erp-lab"} placeholder="ERP Lab URL" />
                    <small class="form-text text-muted">e.g. https://erpx.unit4cloud.com/U4ERX_U4A_PREV</small>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-swagger-api"} placeholder="Swagger URL" />
                    <small class="form-text text-muted">e.g. https://au01-npe.erpx-api.unit4cloud.com/swagger/?tenant=30713278-9cce-43c9-8816-e59c34e8e5c4</small>
                </div>
                <div class="mb-2">
                    < Auth environmentName={this.environmentName} id={this.props.id} />
                </div>
            </>
        )
    }
}

export default Environment