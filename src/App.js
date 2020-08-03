import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, CircularProgress } from '@material-ui/core'
import styled from 'styled-components';
import './App.css';
import { Todo } from './components/Todo/Todo';
import db from './firebase/config';
import firebase from 'firebase';


const StyledButton = styled(Button)`
  margin-top: 1rem !important;
  @media(max-width: 699px){font-size:11px !important; padding: 6px 10px !important; margin-top: 0!important;}
`

const StyledFormControl = styled(FormControl)`
  flex-direction: row !important;  
  align-items: center;
  justify-content: space-between;
  width: 60%;

  @media(max-width: 699px) {
    width: 90%;  
    align-items: baseline;
    }
`

const StyledUl = styled.ul`
  width: 60%;
  padding: 0 !important;

  @media(max-width: 699px) {
    width: 90%;
  }

`



function App() {
  const [todos, setTodos] = useState([ ]);
  const [input, setInput] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    await db.collection('todos').doc().set({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  useEffect(() => {
      db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => ({
          id: doc.id, 
          todo: doc.data().todo
        })))
      })
  }, [])  

  return (
    <div className="app">
      <h1>🚀   Todos GO BRRR   🚀</h1>

      <StyledFormControl className='app__fc'>
        <InputLabel>✔  Write a Todo</InputLabel>
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <StyledButton disabled={!input} onClick={addTodo} variant="contained" color="primary"> go bbbrrr</StyledButton>
      </StyledFormControl>
      <StyledUl>
        {

          todos.length > 0 && 
          todos.map(todo => <Todo id={todo.id} text={todo.todo} />)

        }
      </StyledUl>
      
    </div>
  );
}

export default App;
