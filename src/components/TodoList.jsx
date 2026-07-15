import React from 'react'
import TodoItem from './TodoItem'
function TodoList({toDo, onCompletion, onEdit, onDeletion}) {
    if (toDo.length === 0) {
        return <p className='text-center py-8 text-slate-800 font-medium text-md'> ✨ No Pending Tasks !!! </p>
    }
  return (
    <>
      {toDo.map((todo) => {
          return (
            <ul className='space-y-2 max-h-87.5 overflow-y-auto pr-1 '>
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onEdit={onEdit}
                onCompletion={onCompletion}
                onDeletion={onDeletion}
              />
            </ul>
          );
      })}
    </>
  )
}
export default TodoList