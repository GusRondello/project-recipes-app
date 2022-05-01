import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreDrinks() {
  const componentName = 'explore-drinks';
  const pageTitle = 'Explore Drinks';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
