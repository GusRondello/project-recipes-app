import React from 'react';

function SearchBar() {
  return (
    <>
      <input data-testid="search-input" className="search-input" />
      <button type="button" data-testid="exec-search-btn">Search</button>
      <br />
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="filter"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="filter"
          id="name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="filter"
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
    </>);
}

export default SearchBar;
