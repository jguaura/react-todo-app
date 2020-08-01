import React from 'react';
import './Todo.css';
import { List, ListItem, ListItemText } from '@material-ui/core';

export const Todo = ({ text }) => {
    return (
        <List className='todo__list'>
            <ListItem>
                <ListItemText primary={text} secondary='Deadline ⏰ ' />    
            </ListItem>
        </List>
    )
}

export default Todo;