import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import apiConfig from './api/';


import './SearchBar.css';

// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name + ' ' + suggestion.surname;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    <img className={'suggestion-content'} src={suggestion.photo} alt={suggestion.name}/> <span className='name'>{suggestion.name + ' ' + suggestion.surname}</span>
  </div>
);

export class SearchBar extends Component {
    state = {
      value: '',
      suggestions: []
    };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async({ value, reason }) => {

    const response = await apiConfig.get('/?ext', {
      params: {name: value, amount: 6},
    });

    this.setState({
      suggestions: response.data
    });

    console.log(response.data);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search name',
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default SearchBar
