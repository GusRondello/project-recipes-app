import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreDrinkIngredients() {
  const componentName = 'explore-drinks-ingredients';
  const pageTitle = 'Explore Ingredients';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
