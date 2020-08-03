import React, { useState } from 'react';
import './Todo.css';
import { List, ListItem, ListItemText, Button, Modal, makeStyles, FormControl, InputLabel, Input } from '@material-ui/core';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import db from '../../firebase/config';
import firebase from 'firebase';


const StyledDeleteForeverIcon = styled(DeleteIcon)`
    margin-left: 1rem;
    color: #CCC !important;
    transition: color ease .4s!important;
    &:hover {
        color: #E81224 !important;
    }
`

const StyledEditIcon = styled(EditIcon)`
    color: #CCC !important;
    transition: color ease .4s!important;
    &:hover {
        color: #303F9F !important;
    }
`

const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledFormControl = styled(FormControl)`
    margin: auto !important;
`

const StyledFcContainer = styled.div`
    background-color: white;
    width: 450px;
    height: 200px;
    display: flex;
`

const StyledButton = styled(Button)`
    margin-top: 1.5rem !important;
`

export const Todo = ({ text, id }) => {

    const [open, setOpen] = useState(false)

    const [input, setInput] = useState('');

    const handleOpen = () => setOpen(true)

    const editTodo = () => {
        
        db.collection('todos').doc(id).set({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true})

        setOpen(false)
    }

    return (

        <>

            <StyledModal 
            open={open}
            onClose={() => setOpen(false)}
            >       
                <StyledFcContainer>
                    <StyledFormControl>
                        <InputLabel>Edit Todo 🚀 </InputLabel>
                        <Input value={input} onChange={e => setInput(e.target.value)} placeholder={text} />
                        <StyledButton onClick={editTodo} color='primary' variant='contained'>SEND</StyledButton>
                    </StyledFormControl>
                </StyledFcContainer>
            </StyledModal>

            <List className='todo__list'>
                <ListItem>
                    <ListItemText primary={text} secondary='Deadline ⏰ ' />
                    <StyledEditIcon  className='icon' onClick={handleOpen}  color='primary' />   
                    <StyledDeleteForeverIcon className='icon' onClick={() => db.collection('todos').doc(id).delete()} color='primary' />
                </ListItem>
            </List>
        </> 
    )
}

export default Todo;