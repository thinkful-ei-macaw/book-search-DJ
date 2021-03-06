import React from 'react'
import './Search.css'

function Search (props) {
  return (
    <form className='search-form js-search' onSubmit={e => {
      e.preventDefault()
      props.fetchResults(e.target.search.value)
    }}>
      <label htmlFor='search'>Search: </label>
      <input type='text' id="search" name='search' placeholder='book title'></input>
      <button type='submit'>Search</button>
    </form>
  )
}

export default Search;