import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [input, setInput] = useState('');
  const [data, setData] = useState('');

  function handleInput(event){
    setInput(event.target.value)
  }


  function searchData(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + input).then(res => res.json()).then(dataz => {
      setData(dataz[0].meanings);
    });
  }
  

  return (
    <div className="App">
      <h1 className='title'>Dictionary</h1>
      <TextView  value={ input } placeholder='Enter your word here !' handleInput ={ handleInput }/>
      <button onClick={ searchData } className='search-button'>Search</button>
      <div className='search-results-container'>
        {data && data.map(means => {
          return means.definitions.map(defs => {
            return <p key={uuidv4()}> - {defs.definition}</p>
          })
        })}
      </div>
    </div>
  );
}


function TextView(props){
  return(
      <input className='input' type='text' value={ props.value } onChange={ props.handleInput } placeholder= { props.placeholder }/>
  );
}
export default App;
