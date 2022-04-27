import React from 'react';
import Header from '../../components/Header';

function ExploreFoodIngredients() {
  const componentName = 'explore-foods-ingredients';
  const pageTitle = 'Explore Ingredients';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default ExploreFoodIngredients;
