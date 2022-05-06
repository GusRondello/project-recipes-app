import { RECIPES_DRINK_IN_PROGRESS,
  RECIPES_FOOD_IN_PROGRESS, RECIPES_DONE } from '../action/index';

const INITIAL_STATE = {
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage
    .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} },
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [{}],
};

const Recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPES_DRINK_IN_PROGRESS:
    return {
      ...state,
      inProgressRecipes: {
        ...state.inProgressRecipes,
        cocktails: action.recipesIds.cocktails,
      },
    };
  case RECIPES_FOOD_IN_PROGRESS:
    return {
      ...state,
      inProgressRecipes: {
        ...state.inProgressRecipes,
        meals: action.recipesIds.meals,
      },
    };
  case RECIPES_DONE:
    return {
      ...state,
      doneRecipes: {
        ...state.inProgressRecipes,
        cocktails: action.recipesIds,
      },
    };

  default:
    return state;
  }
};

export default Recipes;
