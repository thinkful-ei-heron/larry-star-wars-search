import React, { Component } from 'react';
import './SearchStarWars.css';

class SearchStarWars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchName: ''
    };
  }

  onChangeInput(name) {
    const newState = this.state;
    newState.searchName = name;

    this.setState(
      { newState }
    );
  }

  handleReset(event) {
    event.preventDefault();
    const newState = this.state;
    newState.searchName = '';

    this.setState (
      { newState }
    );
  }

  fetchResults(url) {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    fetch(`${url}`, options)
      .then(res => res.json())
      .then(resJson => {
        let myResults = this.state.results;
        resJson.results.forEach(result => {
          myResults.push(result);
        });
        this.setState({
          results: myResults
        });
        
        if (resJson.next) {
          this.fetchResults(resJson.next);
        }
      })
      .catch(e => console.log(`Error: ${e.message}`)
    );
  }     
  
  handleSubmit(event) {
    event.preventDefault();
    console.log(`Name is ${this.state.searchName}`);
    const baseURL = 'https://swapi.co/api/';    
    this.fetchResults(`${baseURL}people/`);
  }

  render() {
    return (
      <form className='searchForm' onSubmit={event => this.handleSubmit(event)}>
        <fieldset>
          <legend>Name Search</legend>
          <input
            type="text"
            name="name"
            id="search"
            placeholder="Search Name"
            value={this.state.searchName}
            onChange={event => this.onChangeInput(event.target.value)}
          />
          <div className="searchname__buttons">
            <button onClick={event => this.handleReset(event)}>Reset</button>
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default SearchStarWars;