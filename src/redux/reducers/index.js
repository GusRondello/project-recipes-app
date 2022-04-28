import { combineReducers } from 'redux';
import FilterRecipeFood from './FilterRecipeFood';
import FilterRecipeDrink from './FilterRecipeDrink';

const rootReducer = combineReducers({ FilterRecipeFood, FilterRecipeDrink });

export default rootReducer;
