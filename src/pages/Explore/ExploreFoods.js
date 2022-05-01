import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreFoods() {
  const history = useHistory();
  const componentName = 'explore-foods';
  const pageTitle = 'Explore Foods';

  const handleClick = ({ target }) => {
    const buttonName = target.name;
    if (buttonName === 'byIngredient') {
      history.push('/explore/foods/ingredients');
    }
    if (buttonName === 'byNationality') {
      history.push('/explore/foods/nationalities');
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
        data-testid="explore-by-nationality"
        name="byNationality"
        onClick={ handleClick }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        name="surpriseMe"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
