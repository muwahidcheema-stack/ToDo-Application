import React, { act } from 'react'
function Counter({total, active, completed, OnHandleClearCompleted}) {
  return (
    <>
      <div className='flex items-center justify-between border-b border-slate-400 pb-4 text-ms font-medium text-slate-500'>
        <div className='flex items-center gap-2'>
            <span className='bg-slate-200 rounded-md px-2 py-1 font-semibold text-slate-700'>Total : {total} </span>
            <span className='bg-amber-50 rounded-md px-2 py-1 font-semibold text-amber-700' >Active : {active} </span>
            <span className='bg-emerald-50 rounded-md px-2 py-1 font-semibold text-emerald-700'> Completed : {completed} </span>
        </div>
        {completed > 0 && 
          <button
            className='bg-red-100 text-red-500 hover:text-red-700 hover:underline px-2 py-1 ml-1 rounded-md font-semibold transition-all duration-150'
            onClick={OnHandleClearCompleted}
          > Clear Completed</button>
        }
      </div>
    </>
  )
}
export default Counter