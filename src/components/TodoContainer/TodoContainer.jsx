import React from 'react'
import Todo from '../Todo/Todo'

const TodoContainer = ({ data }) => {
    console.log('data', data)
    return (
        <ul>
        {
            data?.length > 0 &&
            data.map(todo => (<Todo text={todo.todo}/>))
        }
        </ul>
    )
}

export default TodoContainer
