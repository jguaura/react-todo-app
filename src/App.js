import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import './App.css';
import { Todo } from './components/Todo/Todo';
import db from './firebase/config';


function App() {
  const [todos, setTodos] = useState([ ]);
  const [input, setInput] = useState('');

  const addTodo = e => {
    e.preventDefault();
    console.log('🔥 ', input)
    setTodos([...todos, input])
    setInput('')
    console.log('🚓 ', todos)
  }

  const fetchTodos = async () => {
    const snapshot = await db.collection('todos').get();
    const todosMap = snapshot.docs.map(doc => ({todo: doc.data().todo, id: doc.id}))
    setTodos([...todosMap])
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="app">
      <h1>🚀🚀</h1>

      <FormControl>
        <InputLabel>✔  Write a Todo</InputLabel>
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <Button disabled={!input} onClick={addTodo} variant="contained" color="primary"> go bbbrrr</Button>
      </FormControl>

      <ul>
        {
          todos.map(todo => <Todo  text={todo.todo} key={todo.id} />)
        }
      </ul>

    </div>
  );
}

export default App;
