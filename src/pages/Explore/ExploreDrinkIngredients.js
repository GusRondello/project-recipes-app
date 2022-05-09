import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { saveSelectedDrinkIngredient } from '../../redux/action';
import '../../styles/Explore.css';

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
    dispatch(saveSelectedDrinkIngredient(ingredient));
    history.push('/drinks');
    // dispatch(saveSelectedDrinkIngredient(''));
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <main className="explore-ingredients-container">
        {ingredients !== []
          && ingredients.map((ingredient, index) => (
            <button
              type="button"
              className="ingredient-btn"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(ingredient) }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt="ingredient"
              />
              <h1
                className="ingredient-name"
                data-testid={ `${index}-card-name` }
              >
                {ingredient}
              </h1>
            </button>
          )) }
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
