import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {

 
  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const [showError, setShowError] = useState(false);
  const [showEmptyInput, setEmptyInput] = useState(false);

  function handleInput(event){
    setInput(event.target.value)
  }

  function isInputEmpty(){
    if(input === ''){
      return true
    }else{
      return false;
    }
  }

  function clearText(){
    setData('');
  }

  function searchData(){
    clearText();

    if(!isInputEmpty()){
      
      setEmptyInput(false)

      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + input)
      .then( response => {
        if(!response.ok){
          setShowError(true)
          throw new Error('Server Error' + response.status);
        }
        setShowError(false)
        return response.json();
      })
      .then(data => {
        setData(data[0].meanings);
      })
      .catch(error => {
        console.error("There was a problem with the Fetch Operation ", error);
      })
    }else{
      setEmptyInput(true)
    }
  }

  const elements = data === '' ? data : data.map(means => {
    return means.definitions.map(defs => {
      return <p key={ uuidv4() }>- {defs.definition} </p>
    });
  });
  

  return (
    <div className="App">
      <h1 className='title'>Dictionary</h1>
      <TextView  value={ input } placeholder='Enter your word here' handleInput ={ handleInput }/>
      <button onClick={ searchData } className='search-button'>Search</button>
      <div className='search-results-container'>
        { showError && <p className='error-message'>We can't find your word you searched sir !</p> }
        { showEmptyInput && <p className='empty-input'>Enter word for searh sir !</p>}
        {
          elements
        }
        <p style={{display:'none'}}>Hello</p>
      </div>
    </div>
  );
}

//Componennts

function TextView(props){
  return(
      <input className='input' type='text' value={ props.value } onChange={ props.handleInput } placeholder= { props.placeholder } required/>
  );
}
export default App;
