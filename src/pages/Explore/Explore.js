import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Explore() {
  const history = useHistory();
  const componentName = 'explore';
  const pageTitle = 'Explore';

  const handleClickFoodsButton = () => {
    history.push('/explore/foods');
  };

  const handleClickDrinksButton = () => {
    history.push('/explore/drinks');
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ handleClickFoodsButton }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ handleClickDrinksButton }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

export default Explore;
