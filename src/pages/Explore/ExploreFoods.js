import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreFoods() {
  const history = useHistory();
  const componentName = 'explore-foods';
  const pageTitle = 'Explore Foods';

  const getRandomRecipe = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const recipe = await request.json();
    history.push(`/foods/${recipe.meals[0].idMeal}`);
  };

  const handleClick = async ({ target }) => {
    const buttonName = target.name;
    if (buttonName === 'byIngredient') {
      history.push('/explore/foods/ingredients');
    }
    if (buttonName === 'surprise') {
      await getRandomRecipe();
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
        name="surprise"
        onClick={ handleClick }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
