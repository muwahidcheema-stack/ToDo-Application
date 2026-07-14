import React from 'react'
import TodoItem from './TodoItem'
function TodoList({toDo, onCompletion, onEdit, onDeletion}) {
    if (toDo.length === 0) {
        return <p> No Pending Tasks !!! </p>
    }
  return (
    <>
        {toDo.map((todo) => {
            return (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onEdit={onEdit}
                // Pass the action handlers down here:
                // onCompletion={onCompletion}
                // onEdit={onEdit}
                // onDeletion={onDeletion}
              />
            );
        })}
    </>
  )
}

export default TodoList