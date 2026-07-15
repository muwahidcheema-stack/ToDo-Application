import React from 'react'
import { useState } from 'react'
function FilterButtons({name, isPressed, setFilter}) {
  return (
    <>
      <button 
        className={`flex-1 py-1 text-sm font-semibold rounded-md transiion-all duration-150 ${isPressed ? 'bg-white text-golden shadow-md' : 'text-slate-500 hover:text-slate-900 bg-slate-200' }`}
        type='button' 
        aria-pressed = {isPressed} 
        onClick={() => setFilter(name)}
      > {name} </button>
    </>
  )
}
export default FilterButtons