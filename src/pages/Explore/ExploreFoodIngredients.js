import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DOZE = 12;

function ExploreFoodIngredients() {
  const [ingredients, changeIngredients] = useState([]);
  const componentName = 'explore-foods-ingredients';
  const pageTitle = 'Explore Ingredients';

  useEffect(() => {
    const getIngredients = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientsResponse = await request.json();
      changeIngredients(ingredientsResponse.meals.slice(0, DOZE));
    };

    getIngredients();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {ingredients !== []
        && ingredients.map((ingredient, index) => (
          <div key={ ingredient.idIngredient } data-testid={ `${index}-ingredient-card` }>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt="ingredient"
            />
            <h1 data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</h1>
          </div>
        )) }
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
