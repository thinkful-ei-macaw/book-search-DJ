import React from 'react';
import Header from './Components/Header'
import Search from './Components/Search'
import Filter from './Components/Filter'
import Results from './Components/Results'

class App extends React.Component {
  state = {
    results: []
  };



  fetchResults = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then(res => res.json())
    .then(data => {

      this.setState({
        results: data.items
      });
      console.log(this.state.results)
    })

  }

 

  render(){
    const results = this.state.results.map(list => {
      if (list.saleInfo.saleability === "NOT_FOR_SALE") {
        return (
          <li>
            {list.volumeInfo.title}
            {list.volumeInfo.authors[0]}
            NOT FOR SALE
            {list.volumeInfo.description}
          </li>
        )
      } else {
        return(
          <li>
            {list.volumeInfo.title}
            {list.volumeInfo.authors[0]}
            {list.saleInfo.listPrice.amount}
            {list.volumeInfo.description}
        </li>
        )
      }
    });
  return (
    <>
      <Header />
      <main className='App'>
        <Search fetchResults={this.fetchResults}/>
        <Filter />
        <Results results={results}/>
      </main>
      </>
  );
  }
}

export default App;