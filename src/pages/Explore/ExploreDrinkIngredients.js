import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DOZE = 12;

function ExploreDrinkIngredients() {
  const [ingredients, changeIngredients] = useState([]);
  const componentName = 'explore-drinks-ingredients';
  const pageTitle = 'Explore Ingredients';

  useEffect(() => {
    const getIngredients = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const ingredientsResponse = await request.json();
      const firstIngredients = ingredientsResponse.drinks.slice(0, DOZE);
      const ingredientsList = firstIngredients
        .map((ingredient) => ingredient.strIngredient1);
      changeIngredients(ingredientsList);
    };

    getIngredients();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {ingredients !== []
        && ingredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt="ingredient"
            />
            <h1 data-testid={ `${index}-card-name` }>{ingredient}</h1>
          </div>
        )) }
      <img
        src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients[1]}-Small.png` }
        alt="ingredient"
      />
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
