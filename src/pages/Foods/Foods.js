import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Foods() {
  const pageTitle = 'Foods';
  const componentName = 'foods';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <Footer />
    </div>
  );
}

export default Foods;
