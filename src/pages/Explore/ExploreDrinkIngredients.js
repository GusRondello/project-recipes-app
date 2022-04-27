import React from 'react';
import Header from '../../components/Header';

function ExploreDrinkIngredients() {
  const componentName = 'explore-drinks-ingredients';
  const pageTitle = 'Explore Ingredients';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default ExploreDrinkIngredients;
