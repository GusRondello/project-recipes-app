export const FILTER_FOOD = 'FILTER_FOOD';
export const REQUEST_FOODS = 'REQUEST_FOODS';
export const RECEIVE_FOODS = 'RECEIVE_FOODS';

export const saveFilterRecipeFood = (searchWord, searchType) => ({
  type: FILTER_FOOD,
  searchWord,
  searchType,
});

export const requestFoods = () => ({
  type: REQUEST_FOODS,
});

export const receiveFoods = (recipes) => ({
  type: RECEIVE_FOODS, recipes,
});

const getUrl = (type, query) => {
  if (type === 'ingredient') {
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (type === 'name') {
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  }
  return `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
};

export function RequestFoodAPI(type, query) {
  const URL = getUrl(type, query);
  return (dispatch) => {
    dispatch(requestFoods());
    return fetch(URL)
      .then((response) => response.json())
      .then((recipes) => dispatch(receiveFoods(recipes.meals)));
  };
}
