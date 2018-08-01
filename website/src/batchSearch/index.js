import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import './batchSearch.css';
import { url } from '../config'

class batchSearch extends Component {
    constructor() {
        super()
        this.state = {       
            accepted: [],
            rejected: [],
            result: null
        };
        this.onDrop = this.onDrop.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    onDrop(accepted, rejected) {
        this.setState({ accepted, rejected }); 
    }

    uploadFile() {
        if(this.state.accepted.length === 0){
            alert('Please select a JSON file');
            return;
        }

        let filedata = new FormData();
        filedata.append('file', this.state.accepted[0]);
        fetch(`${url}/batchsearch`, {
                method: 'post',
                body: filedata,
            })
            .then(response => {
                return response.text()
            })
            .then(result => {
                this.setState({
                    result: JSON.parse(result)
                })
            });
    }
    render() {
        return (
            <div className="container containerRight">
                <form className="row fileBox">
                    <section>
                        <div className="dropzone">
                            <Dropzone className="zone" accept="application/json" onDrop={this.onDrop}>
                                <p>Click to select files to upload. Only *.json files will be accepted</p>
                            </Dropzone>
                        </div>
                        <aside>
                            <h4>Accepted files</h4>
                            <ul>
                                {
                                this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                }
                            </ul>
                            <h4>Rejected files</h4>
                            <ul>
                                {
                                this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                }
                            </ul>
                        </aside>
                    </section>
                    <button type="button" className="btn btn-default" onClick={this.uploadFile}>Submit</button>
                </form>
                {this.state.result && this.state.result.download &&
                    <div>
                        <h3>
                            <a href={url+this.state.result.download}>Download</a>
                        </h3>
                    </div>
                }
                {this.state.result && this.state.result.data &&
                    <div className="row">
                        {
                            this.state.result.data.map((item) => {
                                return (
                                    <table className="col-sm-8 table table-hover table-bordered table-striped table-condensed">
                                        <thead>
                                            <tr>
                                            <th colSpan="2">{item.name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Status</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })
                        }
                    </div>
                }
                {this.state.result && this.state.result.err_arr &&
                    <div>
                        <h4>The number of failed transactions is {this.state.result.err_arr.length}</h4>
                        {this.state.result.err_arr.length !== 0 &&
                            <ul>
                                {this.state.result.err_arr.map((item)=><li className="li_style">{item}</li>)}
                            </ul>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default batchSearch;