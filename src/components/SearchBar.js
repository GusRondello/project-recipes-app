import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { saveFilterRecipeFood,
  RequestFoodAPI, RequestDrinkAPI, saveFilterRecipeDrink } from '../redux/action';
import '../styles/SideBar.css';

function SearchBar({ recipeType }) {
  const RecipeFoodList = useSelector((state) => state.FilterRecipeFood.data);
  const RecipeDrinkList = useSelector((state) => state.FilterRecipeDrink.data);
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
      const word = 'recipes';
      if (RecipeFoodList === null) {
        global.alert(`Sorry, we haven't found any ${word} for these filters.`);
      }
    }
    if (recipeType === 'drinks') {
      dispatch(saveFilterRecipeDrink(searchWord, searchType));
      dispatch(RequestDrinkAPI(searchType, searchWord));
      const word = 'recipes';
      if (RecipeDrinkList === null) {
        global.alert(`Sorry, we haven't found any ${word} for these filters.`);
      }
    }
    changeSearchWord('');
    changeSearchType('');
  };

  return (
    <div className="sidebar-container">
      <div className="input-search-type">
        <input
          data-testid="search-input"
          className="search-input"
          onChange={ handleChangeInput }
          value={ searchWord }
        />
        <button
          type="button"
          className="sidebar-search-btn"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
        >
          Search
        </button>
      </div>
      <div className="search-type-container">
        <label
          className="search-type-option"
          htmlFor="ingredient"
        >
          <input
            type="radio"
            name="filter"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChangeRadioButton }
          />
          Ingredient
        </label>
        <label
          className="search-type-option"
          htmlFor="name"
        >
          <input
            type="radio"
            name="filter"
            id="name"
            data-testid="name-search-radio"
            onChange={ handleChangeRadioButton }
          />
          Name
        </label>
        <label
          className="search-type-option"
          htmlFor="first-letter"
        >
          <input
            type="radio"
            name="filter"
            id="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ handleChangeRadioButton }
          />
          First Letter
        </label>
      </div>
    </div>);
}

SearchBar.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default SearchBar;
