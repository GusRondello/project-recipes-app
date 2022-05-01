import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { saveSelectedIngredientDrink } from '../../redux/action';

const DOZE = 12;

function ExploreDrinkIngredients() {
  const history = useHistory();
  const componentName = 'explore-drinks-ingredients';
  const pageTitle = 'Explore Ingredients';

  const [ingredients, changeIngredients] = useState([]);
  const dispatch = useDispatch();

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

  const handleClick = (ingredient) => {
    dispatch(saveSelectedIngredientDrink(ingredient));
    history.push('/drinks');
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {ingredients !== []
        && ingredients.map((ingredient, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(ingredient) }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt="ingredient"
            />
            <h1 data-testid={ `${index}-card-name` }>{ingredient}</h1>
          </button>
        )) }
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
