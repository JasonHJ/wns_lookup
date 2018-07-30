import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Search from './Search'
import BatchSearch from './batchSearch'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wanchain Name Service Lookup</h1>
        </header>
        <div className="App-introCont">
          <div className="App-introLeft">
            <Search />
          </div>

          <div className="App-introRight">
            <BatchSearch />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
