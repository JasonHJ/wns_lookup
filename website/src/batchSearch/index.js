import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

import './batchSearch.css';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup className="btn btn-default" controlId={id}>
            <FormControl {...props} />
        </FormGroup>
    );
}

class batchSearch extends Component {
    render() {
        return (
            <div className="container containerRight">
                <form className="row fileBox">
                    <FieldGroup id="formControlsFile" type="file" label="File" help="Example block-level help text here." />
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}

export default batchSearch;