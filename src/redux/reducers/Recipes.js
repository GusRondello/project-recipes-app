const INITIAL_STATE = {
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [{}],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes')),
};

const Recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default Recipes;
