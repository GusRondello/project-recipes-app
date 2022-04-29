import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RecomendationCarousel from '../../components/RecomendationCarousel';

function DrinkDetails() {
  const [drink, setDrink] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const doneRecipes = useSelector((state) => state.Recipes.doneRecipes);
  const [isRecipeDone, setRecipeDone] = useState(false);
  const inProgressRecipes = useSelector((state) => state.Recipes.inProgressRecipes);
  const inProgressIds = Object.keys(inProgressRecipes?.drinks || {});
  const { id } = useParams();
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(
    () => {
      const fetchDrinkById = async () => {
        const response = await fetch(URL);
        const { drinks } = await response.json();
        setDrink(drinks[0]);
      };
      fetchDrinkById();
    }, [URL],
  );

  useEffect(
    () => {
      const fetchRecomendation = async () => {
        const recomendationURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(recomendationURL);
        const { meals } = await response.json();
        const FIVE = 5;
        const firstSixMeals = meals.filter((meal) => meals.indexOf(meal) <= FIVE);
        setRecomendation(firstSixMeals);
      };
      fetchRecomendation();
    }, [],
  );

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = drink;

  useEffect(
    () => {
      const checkIfIsDone = doneRecipes.some((recipe) => recipe.id === idDrink);
      setRecipeDone(checkIfIsDone);
    }, [idDrink, doneRecipes],
  );

  const getIngredientsAndMeasure = () => {
    const twenty = 20;
    const ingredientsAndMeasure = [];
    for (let i = 1; i < twenty; i += 1) {
      if (drink[`strIngredient${i}`]) {
        const li = (
          <li
            key={ i }
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
          >
            {drink[`strIngredient${i}`]}
            {' '}
            -
            {' '}
            {drink[`strMeasure${i}`]}
          </li>);
        ingredientsAndMeasure.push(li);
      }
    }
    return ingredientsAndMeasure;
  };

  return (
    <section>
      <img
        className="meal_image"
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ strDrink }</h2>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <ul>{ getIngredientsAndMeasure() }</ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <RecomendationCarousel recomendations={ recomendation } />
      {
        !isRecipeDone && (
          <button
            className="start_recipe_btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            {
              inProgressIds
                .some((inProgressId) => inProgressId === idDrink)
                ? 'Continue Recipe'
                : 'Start Recipe'
            }

          </button>)
      }
    </section>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
