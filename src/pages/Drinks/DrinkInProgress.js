import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import '../../styles/InProgress.css';

function DrinkInProgress() {
  const [drink, setDrink] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [inputs, setInputs] = useState({});
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);
  const { id } = useParams();
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = drink;

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
      const getIngredientsList = () => {
        const twenty = 20;
        for (let i = 1; i < twenty; i += 1) {
          if (drink[`strIngredient${i}`]) {
            setInputs((prevState) => ({
              ...prevState,
              [`${i}-checkbox`]: false,
            }));
          }
        }
      };
      getIngredientsList();
    }, [drink],
  );

  const handleCheckbox = ({ target }) => {
    const { name } = target;
    const { value } = target.checked;
    console.log(value);
    setInputs((prevState) => ({
      ...prevState,
      [name]: !prevState.value,
    }));
  };

  const getIngredientsAndMeasure = () => {
    const twenty = 20;
    const ingredientsAndMeasure = [];
    for (let i = 1; i < twenty; i += 1) {
      if (drink[`strIngredient${i}`]) {
        const checkbox = (
          <label
            data-testid="ingredient-step"
            htmlFor={ `${i}-checkbox` }
            key={ i }
          >
            {drink[`strIngredient${i}`]}
            {' '}
            -
            {' '}
            {drink[`strMeasure${i}`]}
            <input
              name={ `${i}-checkbox` }
              id={ `${i}-checkbox` }
              type="checkbox"
              checked={ inputs[`${i}-checkbox`] }
              onChange={ handleCheckbox }
            />
          </label>

        );
        ingredientsAndMeasure.push(checkbox);
      }
    }
    return ingredientsAndMeasure;
  };

  const handleShareButton = () => {
    clipboardCopy(window.location.href);
    toast.success('Link copied!');
  };

  const handleFavButton = () => {
    setFavorite((prevState) => !prevState);

    if (!favorite) {
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
    } else {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{}]));
    }
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
        onClick={ handleFavButton }
        src={ favorite ? blackHeart : whiteHeart }
      >
        {
          favorite
            ? <img src={ blackHeart } alt="black heart" />
            : <img src={ whiteHeart } alt="white heart" />
        }
      </button>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <div>{ getIngredientsAndMeasure() }</div>
      <p data-testid="instructions">{ strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </section>
  );
}

export default DrinkInProgress;
