import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreDrinks() {
  const componentName = 'explore-drinks';
  const pageTitle = 'Explore Drinks';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
