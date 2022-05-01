import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Explore() {
  const componentName = 'explore';
  const pageTitle = 'Explore';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <button type="button" data-testid="explore-foods">Explore Foods</button>
      <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      <Footer />
    </div>
  );
}

export default Explore;
