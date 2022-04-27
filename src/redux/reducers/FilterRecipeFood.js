import { FILTER_FOOD, REQUEST_FOODS, RECEIVE_FOODS } from '../action';

const INITIAL_STATE = {
  isFetching: false,
  searchWord: '',
  searchType: '',
};

const FilterRecipeFood = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILTER_FOOD:
    return {
      searchWord: action.searchWord,
      searchType: action.searchType,
    };

  case REQUEST_FOODS:
    return {
      ...state,
      isFetching: true,
    };

  case RECEIVE_FOODS:
    return {
      ...state,
      isFetching: false,
      data: action.recipes,
    };
  default:
    return state;
  }
};

export default FilterRecipeFood;
