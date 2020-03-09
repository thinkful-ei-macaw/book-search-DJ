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



  fetchResults = (title) => {
    this.setState({ title: title })

    if (this.state.booktype && this.state.printtype) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&filter=${this.state.booktype}&printType=${this.state.printtype}`)
      .then(res => 
        res.ok ? res.json() : Promise.reject("Something went wrong!"))
      .then(data => {
        this.setState({
          results: data.items
        })
      })
      .catch(err => this.setState({ error:err.message }))
    } else if (this.state.booktype) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&filter=${this.state.booktype}`)
      .then(res => 
        res.ok ? res.json() : Promise.reject("Something went wrong!"))
      .then(data => {
        this.setState({
          results: data.items
        })
      })
    } else if (this.state.printtype) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&printType=${this.state.printtype}`)
      .then(res => 
        res.ok ? res.json() : Promise.reject("Something went wrong!"))
      .then(data => {
        this.setState({
          results: data.items
        })
      })
    }
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then(res => 
      res.ok ? res.json() : Promise.reject("Something went wrong!"))
    .then(data => {
      this.setState({
        results: data.items
      })
    })
    .catch(err => this.setState({ error:err.message }))
  }

  handleBookType = (target) => {
    this.setState({
      booktype: target
    })
    this.fetchResults(this.title);
  }

  handlePrintType = (target) => {
    this.setState({
      printtype: target
    })
    this.fetchResults(this.title);
  }

  render(){
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }
    const results = this.state.results.map(list => {
      if (list.saleInfo.saleability === "FOR_SALE") {
        return(
          <li key={list.id}>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>{list.saleInfo.listPrice.amount}</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      } else if (list.saleInfo.saleability === "NOT_FOR_SALE") { 
        return (
          <li key={list.id}>
            <h2>{list.volumeInfo.title}</h2>
            <h3>Author: {list.volumeInfo.authors}</h3>
            <span>NOT FOR SALE</span>
            <p>{list.volumeInfo.description}</p>
          </li>
        )
      } else if (list.saleInfo.saleability === "FREE") {
        return (
          <li key={list.id}>
          <h2>{list.volumeInfo.title}</h2>
          <h3>Author: {list.volumeInfo.authors}</h3>
          <span>FREE</span>
          <p>{list.volumeInfo.description}</p>
        </li>
        )
      }
    });
  return (
    <>
      <Header />
      <main className='App'>
        <Search fetchResults={this.fetchResults}/>
        <Filter handleBookType={this.handleBookType} handlePrintType={this.handlePrintType} title={this.state.title}/>
        <Results results={results}/>
      </main>
      </>
  );
  }
}

export default App;