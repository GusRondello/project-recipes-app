import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { saveSelectedFoodIngredient } from '../../redux/action';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DOZE = 12;

function ExploreFoodIngredients() {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const handleClick = (ingredient) => {
    dispatch(saveSelectedFoodIngredient(ingredient));
    history.push('/foods');
    // dispatch(saveSelectedFoodIngredient(''));
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {ingredients !== []
        && ingredients.map((ingredient, index) => (
          <button
            type="button"
            key={ ingredient.idIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(ingredient) }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt="ingredient"
            />
            <h1 data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</h1>
          </button>
        )) }
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
