import 'bootstrap';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RecomendationCarousel from '../../components/RecomendationCarousel';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import '../../styles/FoodDetails.css';

function DrinkDetails({ history }) {
  const [drink, setDrink] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const doneRecipes = useSelector((state) => state.Recipes.doneRecipes);
  const [favorite, setFavorite] = useState(false);
  const [isRecipeDone, setRecipeDone] = useState(false);
  const inProgressRecipes = useSelector((state) => state.Recipes.inProgressRecipes);
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);
  const inProgressIds = Object.keys(inProgressRecipes?.cocktails || []);
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
    strCategory,
    strInstructions,
  } = drink;

  useEffect(
    () => {
      const checkFavorite = () => {
        const check = favoriteRecipes
          .some((recipe) => recipe.id === idDrink);
        setFavorite(check);
      };
      checkFavorite();
    }, [favoriteRecipes, idDrink],
  );

  useEffect(
    () => {
      if (doneRecipes) {
        const checkIfIsDone = doneRecipes.some((recipe) => recipe.id === idDrink);
        setRecipeDone(checkIfIsDone);
      }
    }, [idDrink, doneRecipes],
  );
  const selectButton = () => {
    if (inProgressIds.some((inProgressId) => inProgressId === idDrink)) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

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

  const handleStartRecipe = () => {
    history.push(`/drinks/${idDrink}/in-progress`);
  };

  const handleShareButton = () => {
    clipboardCopy(window.location.href);
    toast.success('Link copied!');
  };

  const handleFavButton = () => {
    setFavorite((prevState) => !prevState);

    const newFavoriteList = [
      {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }];

    window.localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
  };

  return (
    <section className="page-food">
      <img
        className="img-fluid"
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <div className="header-conteiner">
        <div>
          <h2 data-testid="recipe-title">{ strDrink }</h2>
          <p data-testid="recipe-category">{ strAlcoholic }</p>
        </div>
        <div>
          <button
            type="button"
            className="share-btn"
            data-testid="share-btn"
            onClick={ handleShareButton }

          >
            <img src={ shareIcon } alt="share icon" />

          </button>
          <button
            type="button"
            className="favorite-btn"
            data-testid="favorite-btn"
            onClick={ handleFavButton }
            src={ favorite ? blackHeart : whiteHeart }
          >
            {
              favorite
                ? <img src={ blackHeart } alt="black heart" />
                : <img src={ whiteHeart } alt="white heart" />
            }
          </button>
        </div>
      </div>
      <ul className="ingredients">{ getIngredientsAndMeasure() }</ul>
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <div className="carousel">
        <RecomendationCarousel recomendations={ recomendation } />
      </div>
      {
        !isRecipeDone && (
          <button
            className="start_recipe_btn"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipe }
          >
            { selectButton() }
          </button>)
      }
    </section>
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
