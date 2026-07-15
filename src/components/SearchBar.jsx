import React from 'react'
function SearchBar({searchText, setSearchText}) {
  return (
    <>
        <div className='relative'>
            <input
                className='w-full px-4 py-2 bg-slate-100 border border-slate-400 rounded-lg text-sm font-semibold text-slate-500 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-hover-button focus:border-hover-button transition-all duration-150'
                id='search_bar'
                type='text'
                placeholder='Search Tasks...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            ></input>
        </div>
    </>
  )
}
export default SearchBar