import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  const componentName = 'explore-drinks';
  const pageTitle = 'Explore Drinks';

  const handleClick = ({ target }) => {
    const buttonName = target.name;
    if (buttonName === 'byIngredient') {
      history.push('/explore/drinks/ingredients');
    }
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        name="byIngredient"
        onClick={ handleClick }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
