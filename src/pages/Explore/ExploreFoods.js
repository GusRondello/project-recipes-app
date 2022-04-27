import React from 'react';
import Header from '../../components/Header';

function ExploreFoods() {
  const componentName = 'explore-foods';
  const pageTitle = 'Explore Foods';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default ExploreFoods;
