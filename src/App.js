import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import logo from './logo.svg';
import './App.css';

const  lambdaURL = 'https://w0macqg62f.execute-api.us-west-1.amazonaws.com/Prod/issues';

//TODOs: persist data changes uses localstorage in useeffect 
function App() {
  const [dataStore, setDataStore] = useState({
    data : []
});

function addIssue(event){
    var typeOut = document.getElementById('selectMenu').selectedOptions[0].value;
    var descriptionOut = document.getElementById('descText').value;

    //post requires a data section with type and desc to be accepted
    //TODO implement error checking client side and server side and appropriate responses
    fetch(lambdaURL, {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      data:{
        type: typeOut,
        desc: descriptionOut
      }
    }).then((res)=> {
      var statusCode = res.status;
      if(statusCode == 200){
        //reload data 
        var newID = dataStore.data.length + 1;
        //TODO implement uuidv4 as the id 
        var newObj = {id: newID, type: typeOut, desc: descriptionOut};
        var curr = [...dataStore.data];
        curr.push(newObj);
        setDataStore({data: curr});
        return;
      }
      //error occured

    });
    event.preventDefault();
  };

  function removeIssueItem(issueID){
    //delete request requires the issueID 
    fetch(lambdaURL, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      data:{
        "issueID": issueID
      }
    }).then((res)=> {
    var statusCode = res.status;
      if(statusCode == 200){
        //remove from client table instead of force refresh
        var table = document.getElementById('issueTable');
        for(var i = 0; i < table.rows.length; i++){
          if(table.rows[i].id == issueID){
            table.rows[i].remove();
          }
        }
        //TODO implement changes to state array and track an index value instead of using length
        return;
      }
      //error occured
      console.log('error occured in deleting item')
    });
  };

  useEffect(()=>{
    //request data from API at mholloway.dev using the Lambda function 
    //get request take no params
    fetch(lambdaURL, {
      method: 'get',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((res)=> res.json()) //TODO implement error checking in case can't get a valid reply
    .then((issues)=>{
      var json = JSON.parse(issues.body)
      setDataStore({data: json.data});
    });
  },[]);

 
  return (
    <div className="App">
      <Header />
      <div id="tableContainer">
        <table id="issueTable">
          <caption>Issue Tracker Table</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dataStore.data.map(item=>{
            return (
              <tr key={item.id} id={item.id}>
                <td>#{ item.id }</td>
                <td>{ item.type }</td>
                <td>{ item.desc }</td>
                <td><button className='button' onClick={()=> removeIssueItem(item.id)}>Remove</button></td>
              </tr>);
          })}
        </tbody>
        </table>
      </div>
      <br />
      <hr></hr>
      <br />
      <div id='formContainer'>
        <form id='issueForm' onSubmit={addIssue}>
          <h3>Add New Issue</h3>
          <label>Type</label>
            <select id='selectMenu'>
              <option>bug</option>
              <option>severe</option>
              <option>visual</option>
              <option>other</option>
            </select>
          <br />
          <label> Description</label>
          <input name='desc' id='descText' type='text'></input>
          <br />
          <input className='button' type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default App;

