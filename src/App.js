import React, {useState, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';

function App() {
  const [dataStore, setDataStore] = useState({
    data : []
});


const addIssue = () =>{
    var lambdaURL = 'https://w0macqg62f.execute-api.us-west-1.amazonaws.com/Prod/issues';
    fetch(lambdaURL, {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      data:{
        name:"test1",
        type:"bug",
        desc:"An issue found with the POST method to aws lambda caused by CORS issues"
      }
    }).then((res)=> {
      console.log(res)
    });
  };

  const removeItemComp = (issueID) =>{
    console.log(issueID)
    var lambdaURL = 'https://w0macqg62f.execute-api.us-west-1.amazonaws.com/Prod/issues';
    fetch(lambdaURL, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      data:{
        "issueID": issueID
      }
    }).then((res)=> {
      console.log(res)
    });
  };

  useEffect(()=>{
      //get request take no params
    //post needs a body with name, type, and desc
    var lambdaURL = 'https://w0macqg62f.execute-api.us-west-1.amazonaws.com/Prod/issues';
    fetch(lambdaURL, {
      method: 'get',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((res)=> res.json())
    .then((issues)=>{
      var json = JSON.parse(issues.body)
      console.log(json.data);
      setDataStore({data: json.data});
    });
  },[]);



  return (
    <div className="App">

      <div style={{ maxWidth: "100%", paddingTop: "12px" }}>

        <table id="issueTable">
          <caption>Issue Tracker Table</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dataStore.data.map(item=>{
            return (
              <tr key={item.id}>
                <td>#{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.type }</td>
                <td>{ item.desc }</td>
                <td><button onClick={()=> removeItemComp(item.id)}>Remove</button></td>
              </tr>);
          })}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

