import React from 'react';
import Header from '../../components/Header';

function ExploreFoodNationalities() {
  const componentName = 'explore-nationalities';
  const pageTitle = 'Explore Nationalities';

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default ExploreFoodNationalities;
