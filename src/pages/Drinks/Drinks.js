import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Drinks() {
  const pageTitle = 'Drinks';
  const componentName = 'drinks';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <Footer />
    </div>
  );
}

export default Drinks;
