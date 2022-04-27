import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const componentName = 'favorite-recipes';
  const pageTitle = 'Favorite Recipes';

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default FavoriteRecipes;
