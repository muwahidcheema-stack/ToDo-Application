import React from 'react'
import { useState } from 'react'
function TodoForm({onAddToDO}) {
    const [input,setInput] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        let trimmedInput = input.trim();
        if(!trimmedInput){
            return;
        }
        onAddToDO(trimmedInput);
        setInput("")
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
                id='input-form'
                type="text" 
                placeholder='Add a Task' 
                value={input} 
                onChange={(e) => {setInput(e.target.value)}}/>
            <button type="submit" > Add Task </button>
        </form>
    </>
  )
}
export default TodoForm