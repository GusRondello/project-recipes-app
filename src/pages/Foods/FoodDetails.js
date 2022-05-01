import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RecomendationCarousel from '../../components/RecomendationCarousel';
import '../../styles/FoodDetails.css';

function FoodDetails({ history }) {
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isRecipeDone, setRecipeDone] = useState(false);
  const doneRecipes = useSelector((state) => state.Recipes.doneRecipes);
  const inProgressRecipes = useSelector((state) => state.Recipes.inProgressRecipes);
  const inProgressIds = Object.keys(inProgressRecipes?.meals || {});
  const { id } = useParams();
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;

  useEffect(
    () => {
      const fetchRecipeById = async () => {
        const response = await fetch(URL);
        const { meals } = await response.json();
        setRecipe(meals[0]);
      };
      fetchRecipeById();
    }, [URL],
  );

  useEffect(
    () => {
      const fetchRecomendation = async () => {
        const recomendationURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(recomendationURL);
        const { drinks } = await response.json();
        const FIVE = 5;
        const firstSixDrinks = drinks.filter((drink) => drinks.indexOf(drink) <= FIVE);
        setRecomendation(firstSixDrinks);
      };
      fetchRecomendation();
    }, [],
  );

  useEffect(
    () => {
      const checkIfIsDone = doneRecipes.some((item) => item.id === idMeal);
      setRecipeDone(checkIfIsDone);
    }, [idMeal, doneRecipes],
  );

  const getIngredientsAndMeasure = () => {
    const twenty = 20;
    const ingredientsAndMeasure = [];
    for (let i = 1; i < twenty; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        const li = (
          <li
            key={ i }
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
          >
            {recipe[`strIngredient${i}`]}
            {' '}
            -
            {' '}
            {recipe[`strMeasure${i}`]}
          </li>);
        ingredientsAndMeasure.push(li);
      }
    }
    return ingredientsAndMeasure;
  };

  const handleStartRecipe = () => {
    history.push(`/foods/${idMeal}/in-progress`);
  };

  const handleShareButton = () => {
    clipboardCopy(window.location.href);
    toast.success('Link copied!');
  };

  return (
    <section>
      <img
        className="meal_image"
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ strMeal }</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButton }
      >
        Share

      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">{ strCategory }</p>
      <ul>{getIngredientsAndMeasure()}</ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <iframe
        title={ strMeal }
        width="341"
        height="160"
        data-testid="video"
        src={ String(strYoutube).replace('watch?v=', 'embed/') }
      />
      <RecomendationCarousel recomendations={ recomendation } />
      {
        !isRecipeDone && (
          <button
            className="start_recipe_btn"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipe }
          >
            {
              inProgressIds
                .some((inProgressId) => inProgressId === idMeal)
                ? 'Continue Recipe'
                : 'Start Recipe'
            }

          </button>)
      }
    </section>
  );
}

FoodDetails.propTypes = {
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default FoodDetails;
