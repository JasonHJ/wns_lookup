import React, { Component } from 'react';

import { InputGroup } from 'react-bootstrap';
import { url } from '../config'

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { result: null };
    this.textInput = React.createRef();
    this.handleData = this.handleData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleData(data) {
    if(data.status === 0) {
      return {
        name: data.name,
        status: "Name is available and the auction hasn't started"
      };
    }
    if(data.status === 1) {
      return {
        name: data.name,
        status: "Name is available and the auction has been started",
        endTime: (new Date(data.endTime)).toString()
      };
    }
    if(data.status === 2) {
      return {
        name: data.name,
        status: "Name is taken and currently owned by someone",
        endTime: (new Date(data.endTime)).toString(),
        owner: data.owner,
        value: data.value + " WAN",
        highestBid: data.highestBid + " WAN"
      };
    }
    if(data.status === 3) {
      return {
        name: data.name,
        status: "Name is forbidden"
      };
    }
    if(data.status === 4) {
      return {
        name: data.name,
        status: "Name is currently in the 'reveal' stage of the auction",
        endTime: (new Date(data.endTime)).toString(),
        curWinner: data.curWinner,
        curBid: data.curBid + " WAN"
      };
    }
    if(data.status === 5) {
      return {
        name: data.name,
        status: "Name is not yet available due to the 'soft launch' of names.",
        endTime: (new Date(data.endTime)).toString()
      };
    }
    if(data.status === 6) {
      return {
        name: data.name,
        status: data.message.toString()
      };
    }
  }

  handleClick() {
    let input = this.textInput.current.value;
    if(input){
      fetch(`${url}/domainstatus/${input}`)
            .then((result) => {
              return result.text()
            })
            .then((data) => {
              this.setState({
                result: this.handleData(JSON.parse(data))
              })
            });
    }
    this.textInput.current.value = '';
  }

  render() {
    return (
      <div className="container containerLeft">
        <div className="row">
          <InputGroup>
            <input type="text" ref={this.textInput} className="form-control" placeholder="Search for domain status" />
            <span className="input-group-addon">.wan</span>
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={this.handleClick} type="button">Search Domain</button>
            </span>
          </InputGroup>
        </div>
        {this.state.result && 
          <div className="row">
            <table className="col-sm-8 table table-hover table-bordered table-striped table-condensed">
              <thead>
                <tr>
                  <th colSpan="2">{this.state.result.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Status</td>
                  <td>{this.state.result.status}</td>
                </tr>
                {this.state.result.endTime && 
                  <tr>
                    <td>The end time of auction</td>
                    <td>{this.state.result.endTime}</td>
                  </tr>
                }
                {this.state.result.owner && 
                  <tr>
                    <td>Owner</td>
                    <td>{this.state.result.owner}</td>
                  </tr>
                }
                {this.state.result.curWinner && 
                  <tr>
                    <td>Current Owner</td>
                    <td>{this.state.result.curWinner}</td>
                  </tr>
                }
                {this.state.result.curBid && 
                  <tr>
                    <td>Current Winning Bid</td>
                    <td>{this.state.result.curBid}</td>
                  </tr>
                }
                {this.state.result.value && 
                  <tr>
                    <td>Value</td>
                    <td>{this.state.result.value}</td>
                  </tr>
                }
                {this.state.result.highestBid && 
                  <tr>
                    <td>Highest Bid</td>
                    <td>{this.state.result.highestBid}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
} 

export default Search;