import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import apiConfig from './api/';

import './SearchBar.css';

const renderSuggestion = suggestion => (
  <div>
    <img className={'suggestion-content'} src={suggestion.profile_image.medium} alt={suggestion.name}/> <span className='name'>{suggestion.name}</span>
  </div>
);

export class SearchBar extends Component {
    state = {
      value: '',
      suggestions: [],
      suggestionValue: ''
    };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };


  getSuggestionValue = (suggestion) => {
    this.setState({
      suggestionValue: suggestion
    });

    return suggestion.name;
  }

  onSuggestionsFetchRequested = async({ value, reason }) => {

    const response = await apiConfig.get('/search/users', {
      params: {query: value},
    });

    this.setState({
      suggestions: response.data.results
    });

    console.log(response.data);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, suggestionValue } = this.state;

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
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {
          suggestionValue &&
          <div>
            <img className={'suggestionImage'} src={suggestionValue.profile_image.large} alt={suggestionValue.name}/>
            <h1 className={'suggestionName'}>{suggestionValue.name}</h1>
          </div>
        }
      </div>
    )
  }
}

export default SearchBar
