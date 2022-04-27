import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFilterRecipeFood, RequestFoodAPI } from '../redux/action';

function SearchBar() {
  const [searchWord, changeSearchWord] = useState('');
  const [searchType, changeSearchType] = useState('');
  const dispatch = useDispatch();

  const handleChangeInput = ({ target }) => {
    changeSearchWord(target.value);
  };

  const handleChangeRadioButton = ({ target }) => {
    changeSearchType(target.id);
  };

  const handleSubmit = async () => {
    if (searchType === 'first-letter' && searchWord.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    dispatch(saveFilterRecipeFood(searchWord, searchType));
    changeSearchWord('');
    changeSearchType('');
    dispatch(RequestFoodAPI(searchType, searchWord));
  };

  return (
    <>
      <input
        data-testid="search-input"
        className="search-input"
        onChange={ handleChangeInput }
        value={ searchWord }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSubmit }
      >
        Search
      </button>
      <br />
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="filter"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChangeRadioButton }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="filter"
          id="name"
          data-testid="name-search-radio"
          onChange={ handleChangeRadioButton }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="filter"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ handleChangeRadioButton }
        />
        First Letter
      </label>
    </>);
}

export default SearchBar;
