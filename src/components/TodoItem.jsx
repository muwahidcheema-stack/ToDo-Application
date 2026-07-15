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
    <li className='gap-3 p-3 bg-slate-100 border border-slate-500 rounded-xl hover:border-slate-200/60 transition-all duration-150'>
      {isEditing ? (
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 w-full'>
          <input 
            className='flex-1 py-1 px-3 bg-white border border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-100'
            type="text" 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className='px-3 py-1 text-white text-sm font-semibold rounded-md bg-golden hover:bg-hover-button transition-colors' onClick={handleSave}> Save </button>
          <button className= 'px-3 py-1 text-slate-500 hover:text-slate-900 bg-white border border-slate-700 text-ms font-semibold rounded-md transition-colors' onClick={handleCancel}> Cancel </button>
          
        </div>
      ) : (
        <div>
          <div className='flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-between'>
            <button className={`shrink-0 rounded-md px-2.5 py-1.5 text-xs font-semibold border transition-colors ${ todo.completed ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
            onClick={() => onCompletion(todo.id)}> 
            {todo.completed ? 'Completed ✔️' : 'Mark Done'} 
            </button>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> 
              {todo.text} 
            </span>
          </div>
          
          <div className='flex gap-2 justify-end shrink-0 border-t border-slate-300/40 pt-2 sm:border-none sm:pt-0'>
            <button className='bg-amber-50 rounded-md px-2 py-1 font-semibold text-amber-700' onClick={() => setIsEditing(true)}>Edit</button>
            <button className='bg-red-100 text-red-500 hover:text-red-700 hover:underline px-2 py-1 ml-1 rounded-md font-semibold transition-all duration-150' onClick={() => onDeletion(todo.id)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  )
}
export default TodoItem