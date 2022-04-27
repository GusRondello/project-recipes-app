import React from 'react';
import Header from '../../components/Header';

function Foods() {
  const pageTitle = 'Foods';
  const componentName = 'foods';
  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
    </div>
  );
}

export default Foods;
