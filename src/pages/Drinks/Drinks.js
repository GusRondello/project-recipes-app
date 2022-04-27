import React from 'react';
import Header from '../../components/Header';

function Drinks() {
  const pageTitle = 'Drinks';
  const componentName = 'drinks';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default Drinks;
