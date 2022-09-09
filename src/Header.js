import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';

import './Header.css';

const  lambdaURL = 'https://w0macqg62f.execute-api.us-west-1.amazonaws.com/Prod/issues';

function Header() {
  return (
    <div className="Header">
      <div id="headerContainer">
        <a href='https://mholloway.dev/projects'>Return to Mholloway.Dev</a>
      </div>
    </div>
  );
}

export default Header;

