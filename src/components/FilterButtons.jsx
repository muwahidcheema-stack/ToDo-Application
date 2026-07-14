import React from 'react'
import { useState } from 'react'
function FilterButtons({name, isPressed, setFilter}) {
  return (
    <>
        <button 
            type='button' 
            aria-pressed = {isPressed} 
            onClick={() => setFilter(name)}
        > {name} </button>
    </>
  )
}
export default FilterButtons