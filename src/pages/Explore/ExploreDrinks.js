import React from 'react';
import Header from '../../components/Header';

function ExploreDrinks() {
  const componentName = 'explore-drinks';
  const pageTitle = 'Explore Drinks';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default ExploreDrinks;
