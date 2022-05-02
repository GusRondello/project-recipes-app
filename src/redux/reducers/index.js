import { combineReducers } from 'redux';
import FilterRecipeFood from './FilterRecipeFood';
import FilterRecipeDrink from './FilterRecipeDrink';
import Recipes from './Recipes';

const rootReducer = combineReducers({ FilterRecipeFood, FilterRecipeDrink, Recipes });

export default rootReducer;
