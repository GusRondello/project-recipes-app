import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreFoods() {
  const componentName = 'explore-foods';
  const pageTitle = 'Explore Foods';
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
        data-testid="explore-by-nationality"
      >
        By Nationality
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

export default ExploreFoods;
