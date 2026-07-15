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
        <form className='flex gap-2' onSubmit={handleSubmit}>
            <input
                className='flex-1 px-4 py-2 border border-slate-400 font-semibold rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-hover-button focus:border-hover-button transition-all' 
                id='input-form'
                type="text" 
                placeholder='What needs to be Done...' 
                value={input} 
                onChange={(e) => {setInput(e.target.value)}}/>
            <button type="submit" className='px-4 py-2 bg-golden hover:bg-hover-button active:bg-indigo-800 rounded-xl text-lg shadow-sm font-semibold text-white hover:shadow transition-all duration-150'> Add </button>
        </form>
    </>
  )
}
export default TodoForm