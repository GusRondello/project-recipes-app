import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const componentName = 'done-recipes';
  const pageTitle = 'Done Recipes';
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default DoneRecipes;
