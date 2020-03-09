import React from 'react'

function Filter (props) {
  return (
    <form className="filter js-filter">
      <label htmlFor="print-type">Print Type: </label>
      <select onChange={e => props.handlePrintType(e.target.value)} id="print-type">
        <option value="" defaultValue hidden>Print Type</option>
        <option value="all">All</option>
        <option value="books">Books</option>
        <option value="magazines">Magazines</option>
      </select>
      <label htmlFor="book-type">Book Type: </label>
      <select onChange={e => props.handleBookType(e.target.value)}id="book-type">
        <option value="" defaultValue hidden>Book Type</option>
        <option id ="free" value="free-ebooks">Free eBooks</option>
      </select>
    </form>
  )
}

export default Filter;