import React, { Component } from 'react'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.environmentName = props.environmentName;
        this.id = props.id;
    }

    render() {
        return (
            <>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-company-id"} placeholder="Company ID" />
                    <small class="form-text text-muted">e.g. X10</small>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-access-token-url"} placeholder="Access token" />
                    <small class="form-text text-muted">e.g. https://s-au-ids1-preview.unit4cloud.com/identity/connect/token</small>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-client-id"} placeholder="Client ID" />
                    <small class="form-text text-muted">e.g. u4erp-api-u4erx_u4a_prev-m2m</small>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" id={this.environmentName + "-client-secret"} placeholder="Client secret" />
                    <small class="form-text text-muted">e.g. 32253d53-3541-4916-a898-9220357d8141</small>
                </div>
            </>
        )
    }
}

export default Auth