import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import '../../styles/InProgress.css';

function getIngredientsAndMeasure(handleCheckbox, recipe, inputs) {
  const twenty = 20;
  const ingredientsAndMeasure = [];
  for (let i = 1; i < twenty; i += 1) {
    if (recipe[`strIngredient${i}`]) {
      const checkbox = (
        <label
          className={ inputs[`${i}-checkbox`] ? 'checked_input' : undefined }
          data-testid={ `${i - 1}-ingredient-step` }
          htmlFor={ `${i}-checkbox` }
          key={ i }
        >
          {recipe[`strIngredient${i}`]}
          {' '}
          -
          {' '}
          {recipe[`strMeasure${i}`]}
          <input
            name={ `${i}-checkbox` }
            id={ `${i}-checkbox` }
            checked={ !!inputs[`${i}-checkbox`] }
            onChange={ handleCheckbox }
            type="checkbox"
          />
        </label>

      );
      ingredientsAndMeasure.push(checkbox);
    }
  }
  return ingredientsAndMeasure;
}

function handleFavButton(strArea) {
  setFavorite((prevState) => !prevState);

  if (!favorite) {
    const newFavoriteList = [
      {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];

    window.localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
  } else {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify([{}]));
  }
}

function FoodInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const {
    strMealThumb,
    idMeal,
    strArea,
    strMeal,
    strCategory,
    strInstructions,
  } = recipe;
  const inProgressRecipes = useSelector((state) => state.Recipes.inProgressRecipes);
  const [inputs, setInputs] = useState({});
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);
  const { id } = useParams();
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  // console.log(inProgressRecipes.meals[idMeal]);
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
      const checkFavorite = () => {
        const check = favoriteRecipes
          .some((meal) => meal.id === idMeal);
        setFavorite(check);
      };
      checkFavorite();
    }, [favoriteRecipes, idMeal],
  );

  useEffect(
    () => {
      const getIngredientsList = () => {
        const twenty = 20;
        for (let i = 1; i < twenty; i += 1) {
          if (recipe[`strIngredient${i}`]) {
            setInputs((prevState) => ({
              ...prevState,
              [`${i}-checkbox`]: false,
            }));
          }
          if (inProgressRecipes.meals !== undefined && inProgressRecipes.meals !== []) {
            setInputs((prevState) => ({
              ...prevState,
              ...inProgressRecipes.meals[idMeal],
            }));
          }
        }
      };
      getIngredientsList();
    }, [recipe, idMeal],
  );

  useEffect(
    () => {
      const newState = {
        meals: {
          [idMeal]: { ...inputs },
        },
      };
      window.localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
    }, [idMeal, inputs],
  );

  const handleCheckbox = ({ target }) => {
    const { name, checked } = target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
        <img src={ shareIcon } alt="share icon" />

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavButton(strArea) }
        src={ favorite ? blackHeart : whiteHeart }
      >
        {
          favorite
            ? <img src={ blackHeart } alt="black heart" />
            : <img src={ whiteHeart } alt="white heart" />
        }
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      <div>{recipe && getIngredientsAndMeasure(handleCheckbox, recipe, inputs)}</div>
      <p data-testid="instructions">{ strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </section>
  );
}

export default FoodInProgress;
