import React, { act } from 'react'

function Counter({total, active, completed}) {
  return (
    <>
        <div>
            <h3>Total Tasks : {total} </h3>
            <h3>Total Active Tasks : {active} </h3>
            <h3>Total Completed Tasks : {completed} </h3>
        </div>
    </>
  )
}
export default Counter