import React from 'react'
import './Search.css'

function Search (props) {
  return (
    <form className='search-form js-search'>
      <label htmlFor='search'>Search: </label>
      <input type='text' id="search" name='search' placeholder='book title'></input>
      <button type='submit' onClick={e => {
        e.preventDefault()
        props.fetchResults(document.getElementById('search').value)}}>Search</button>
    </form>
  )
}

export default Search;