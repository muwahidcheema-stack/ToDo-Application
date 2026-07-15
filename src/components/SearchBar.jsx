import React from 'react'

function SearchBar({searchText, setSearchText}) {
  return (
    <>
        <input
            id='search_bar'
            type='text'
            placeholder='Search Tasks...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        ></input>
    </>
  )
}
export default SearchBar