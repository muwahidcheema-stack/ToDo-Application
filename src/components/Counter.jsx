import React, { act } from 'react'

function Counter({total, active, completed, OnHandleClearCompleted}) {
  return (
    <>
      <div>
        <div>
            <h3>Total Tasks : {total} </h3>
            <h3>Total Active Tasks : {active} </h3>
            <h3>Total Completed Tasks : {completed} </h3>
        </div>
        {completed > 0 && 
          <button
            onClick={OnHandleClearCompleted}
          > Clear Completed Tasks </button>
        }
      </div>
    </>
  )
}
export default Counter