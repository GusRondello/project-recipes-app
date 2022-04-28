import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreFoodNationalities() {
  const componentName = 'explore-nationalities';
  const pageTitle = 'Explore Nationalities';

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <Footer />
    </div>
  );
}

export default ExploreFoodNationalities;
