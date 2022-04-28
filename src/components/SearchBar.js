import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { saveFilterRecipeFood,
  RequestFoodAPI, RequestDrinkAPI, saveFilterRecipeDrink } from '../redux/action';

function SearchBar({ recipeType }) {
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
    if (recipeType === 'foods') {
      dispatch(saveFilterRecipeFood(searchWord, searchType));
      dispatch(RequestFoodAPI(searchType, searchWord));
    }
    if (recipeType === 'drinks') {
      dispatch(saveFilterRecipeDrink(searchWord, searchType));
      dispatch(RequestDrinkAPI(searchType, searchWord));
    }
    changeSearchWord('');
    changeSearchType('');
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

SearchBar.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default SearchBar;
