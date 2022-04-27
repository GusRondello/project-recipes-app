import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const componentName = 'done-recipes';
  const pageTitle = 'Done Recipes';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default DoneRecipes;
