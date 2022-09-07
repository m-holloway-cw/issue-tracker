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
      <div>
        <h2>
          App header
        </h2>
        </div>
    </div>
  );
}

export default App;
