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
              onCompletion={onCompletion}
              onDeletion={onDeletion}
            />
          );
      })}
    </>
  )
}
export default TodoList