export const FILTER_FOOD = 'FILTER_FOOD';
export const REQUEST_FOODS = 'REQUEST_FOODS';
export const RECEIVE_FOODS = 'RECEIVE_FOODS';
export const FILTER_DRINK = 'FILTER_DRINK';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';
export const RECEIVE_DRINKS = 'RECEIVE_DRINKS';
export const SELECTED_FOOD_INGREDIENT = 'SELECTED_FOOD_INGREDIENT';
export const SELECTED_DRINK_INGREDIENT = 'SELECTED_DRINK_INGREDIENT';
export const RECIPES_DRINK_IN_PROGRESS = 'RECIPES_DRINK_IN_PROGRESS';
export const RECIPES_FOOD_IN_PROGRESS = 'RECIPES_FOOD_IN_PROGRESS';
export const RECIPES_DONE = 'RECIPES_DONE';

export const saveFilterRecipeFood = (searchWord, searchType) => ({
  type: FILTER_FOOD,
  searchWord,
  searchType,
});

export const saveSelectedFoodIngredient = (ingredient) => ({
  type: SELECTED_FOOD_INGREDIENT,
  ingredient,
});

export const saveSelectedDrinkIngredient = (ingredient) => ({
  type: SELECTED_DRINK_INGREDIENT,
  ingredient,
});

export const requestFoods = () => ({
  type: REQUEST_FOODS,
});

export const receiveFoods = (recipes) => ({
  type: RECEIVE_FOODS, recipes,
});

const getUrlFoods = (type, query) => {
  if (type === 'ingredient') {
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (type === 'name') {
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  }
  return `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
};

export function RequestFoodAPI(type, query) {
  const URL = getUrlFoods(type, query);
  return (dispatch) => {
    dispatch(requestFoods());
    return fetch(URL)
      .then((response) => response.json())
      .then((recipes) => dispatch(receiveFoods(recipes.meals)));
  };
}

export const saveFilterRecipeDrink = (searchWord, searchType) => ({
  type: FILTER_DRINK,
  searchWord,
  searchType,
});

export const requestDrinks = () => ({
  type: REQUEST_DRINKS,
});

export const receiveDrinks = (recipes) => ({
  type: RECEIVE_DRINKS, recipes,
});

const getUrlDrinks = (type, query) => {
  if (type === 'ingredient') {
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (type === 'name') {
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  }
  return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
};

export function RequestDrinkAPI(type, query) {
  const URL = getUrlDrinks(type, query);
  return (dispatch) => {
    dispatch(requestDrinks());
    return fetch(URL)
      .then((response) => response.json())
      .then((drink) => dispatch(receiveDrinks(drink.drinks)));
  };
}

export const saveRecipesDrinkInProgress = (recipesIds) => ({
  type: RECIPES_DRINK_IN_PROGRESS,
  recipesIds,
});

export const saveRecipesFoodInProgress = (recipesIds) => ({
  type: RECIPES_FOOD_IN_PROGRESS,
  recipesIds,
});

export const saveRecipesDone = (recipes) => ({
  type: RECIPES_DONE,
  recipes,
});
