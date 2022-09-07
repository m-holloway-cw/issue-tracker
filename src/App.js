import React from 'react'
import ReactDOM from 'react-dom'

import logo from './logo.svg';
import './App.css';

function App() {
  //get request take no params
  //post needs a body with name, type, and desc
  var lambdaURL = 'https://w0macqg62f.execute-api.us-west-1.amazonaws.com/Prod/issues';
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
