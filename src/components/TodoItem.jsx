import React from 'react'
import { useState } from 'react'
function TodoItem({todo, onCompletion, onEdit, onDeletion}) {
    const [editText, setEditText] = useState(todo.text)
    const [isEditing, setIsEditing] = useState(false)
    const handleSave = () => {
        const  trimmedText = editText.trim();
        if (!trimmedText) {
            return;
        }
        onEdit(todo.id, trimmedText)
        setIsEditing(false)
    }
    const handleCancel = () => {
        setEditText(todo.text);
        setIsEditing(false);
    }
    
  return (
    <li>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}> Save </button>
          <button onClick={handleCancel}> Cancel </button>
          
        </>
      ) : (
        <>
          <button onClick={() => onCompletion(todo.id)}> Mark As Completed </button>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> 
            {todo.text} 
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeletion(todo.id)}>Delete</button>
        </>
      )}
    </li>
  )
}
export default TodoItem