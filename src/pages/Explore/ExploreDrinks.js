import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  const componentName = 'explore-drinks';
  const pageTitle = 'Explore Drinks';

  const getRandomRecipe = async () => {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const recipe = await request.json();
    history.push(`/drinks/${recipe.drinks[0].idDrink}`);
  };

  const handleClick = async ({ target }) => {
    const buttonName = target.name;
    if (buttonName === 'byIngredient') {
      history.push('/explore/drinks/ingredients');
    }
    if (buttonName === 'surprise') {
      await getRandomRecipe();
    }
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <main className="button-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-by-ingredient"
          name="byIngredient"
          onClick={ handleClick }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="explore-btn"
          name="surprise"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
