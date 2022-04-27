import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreFoods() {
  const componentName = 'explore-foods';
  const pageTitle = 'Explore Foods';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
