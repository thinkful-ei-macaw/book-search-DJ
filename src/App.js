import React from 'react';
import Header from './Components/Header'
import Search from './Components/Search'
import Filter from './Components/Filter'
import Results from './Components/Results'

class App extends React.Component {
  state = {
    results: [],
    error: null,
    title: "",
    booktype: null,
    printtype: null
  };


  fetchTitleResults = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then(res => 
        res.ok ? res.json() : Promise.reject("Something went wrong!"))
      .then(data => {
        this.setState({
          results: data.items,
          title: title
        })
      })
      .catch(err => this.setState({ error:err.message }));
    }
  
    fetchPrintResults = (printtype) => {
      if (this.state.booktype) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&filter=${this.state.booktype}&printType=${printtype}`)
        .then(res => 
          res.ok ? res.json() : Promise.reject("Something went wrong!"))
        .then(data => {
          this.setState({
            results: data.items,
            printtype: printtype
          })
        })
        .catch(err => this.setState({ error:err.message }));
      } else {

      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&printType=${printtype}`)
        .then(res => 
          res.ok ? res.json() : Promise.reject("Something went wrong!"))
        .then(data => {
          this.setState({
            results: data.items,
            printtype: printtype
          })
        })
        .catch(err => this.setState({ error:err.message }));
      }
      }
    

    fetchBookResults = (booktype) => {

      if (this.state.printtype) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&filter=${booktype}&printType=${this.state.printtype}`)
        .then(res => 
          res.ok ? res.json() : Promise.reject("Something went wrong!"))
        .then(data => {
          this.setState({
            results: data.items,
            booktype: booktype
          })
        })
        .catch(err => this.setState({ error:err.message }));
      } else {

      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&filter=${booktype}`)
        .then(res => 
          res.ok ? res.json() : Promise.reject("Something went wrong!"))
        .then(data => {
          this.setState({
            results: data.items,
            booktype: booktype
          })
        })
        .catch(err => this.setState({ error:err.message }));
      }
      }

  render(){
    if (this.state.error) {
      return (<div>Error: {this.state.error}</div>);
    }
    let results = [];
    if (this.state.results !== undefined) {
      // eslint-disable-next-line array-callback-return
      results = this.state.results.map(list => {
      if (list.saleInfo.saleability === "FOR_SALE" && list.volumeInfo.imageLinks !== undefined) {
        return(
          <li key={list.id}>
            <img src={list.volumeInfo.imageLinks.thumbnail} alt="book cover art"/>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>{list.saleInfo.listPrice.amount}</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      } else if (list.saleInfo.saleability === "FOR_SALE" && list.volumeInfo.imageLinks === undefined){
        return(
          <li key={list.id}>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>{list.saleInfo.listPrice.amount}</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      } else if (list.saleInfo.saleability === "NOT_FOR_SALE" && list.volumeInfo.imageLinks !== undefined) { 
        return (
          <li key={list.id}>
            <img src={list.volumeInfo.imageLinks.thumbnail} alt="book cover art"/>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>NOT FOR SALE</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      } else if (list.saleInfo.saleability === "NOT_FOR_SALE" && list.volumeInfo.imageLinks === undefined){
        return(
          <li key={list.id}>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>NOT FOR SALE</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      } else if (list.saleInfo.saleability === "FREE" && list.volumeInfo.imageLinks !== undefined) {
        return (
          <li key={list.id}>
            <img src={list.volumeInfo.imageLinks.thumbnail} alt="book cover art"/>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>FREE</span>
            <p>{list.volumeInfo.description}</p>
        </li>
        )
      } else if (list.saleInfo.saleability === "FREE" && list.volumeInfo.imageLinks === undefined){
        return(
          <li key={list.id}>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>FREE</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      }
    });} else {
      results = 
        <li>
          There are no results matching your parameters.
        </li>
    }
  return (
    <>
      <Header />
      <main className='App'>
        <Search fetchResults={this.fetchTitleResults}/>
        <Filter handleBookType={this.fetchBookResults} handlePrintType={this.fetchPrintResults} title={this.state.title}/>
        <Results results={results}/>
      </main>
    </>
  );
  }
}

export default App;