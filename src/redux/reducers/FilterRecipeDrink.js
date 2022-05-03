import { FILTER_DRINK, REQUEST_DRINKS,
  RECEIVE_DRINKS, SELECTED_DRINK_INGREDIENT } from '../action/index';

const INITIAL_STATE = {
  isFetching: false,
  searchWord: '',
  searchType: '',
  data: null,
  ingredient: '',
};

const FilterRecipeDrink = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SELECTED_DRINK_INGREDIENT:
    return {
      ...state,
      ingredient: action.ingredient,
    };
  case FILTER_DRINK:
    return {
      searchWord: action.searchWord,
      searchType: action.searchType,
    };

  case REQUEST_DRINKS:
    return {
      ...state,
      isFetching: true,
    };

  case RECEIVE_DRINKS:
    return {
      ...state,
      isFetching: false,
      data: action.recipes,
    };
  default:
    return state;
  }
};

export default FilterRecipeDrink;
