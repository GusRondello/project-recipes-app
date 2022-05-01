import { FILTER_FOOD, RECEIVE_FOODS,
  REQUEST_FOODS, SELECTED_FOOD_INGREDIENT } from '../action';

const INITIAL_STATE = {
  isFetching: false,
  searchWord: '',
  searchType: '',
  data: null,
  ingredient: '',
};

const FilterRecipeFood = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SELECTED_FOOD_INGREDIENT:
    return {
      ...state,
      ingredient: action.ingredient,
    };
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
