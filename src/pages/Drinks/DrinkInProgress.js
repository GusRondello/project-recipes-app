import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import {
  saveRecipesDone, saveRecipesDrinkInProgress,
} from '../../redux/action/index';
import { getIngredientsAndMeasures } from '../../services/service';
import '../../styles/InProgress.css';

function handleFavButton(recipe, favorite, setFavorite) {
  setFavorite((prevState) => !prevState);
  const {
    strDrinkThumb,
    idDrink,
    strAlcoholic,
    strDrink,
    strCategory,
  } = recipe;

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
}

const handleShareButton = (idDrink) => {
  clipboardCopy(`http://localhost:3000/drinks/${idDrink}`);
  toast.success('Link copied!');
};

function DrinkInProgress() {
  const dispatch = useDispatch();
  const [drink, setDrink] = useState([]);
  const inProgressRecipes = useSelector((state) => state.Recipes.inProgressRecipes);
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);
  const [ingredientsAndMeasures, setIngredientsAndMeaures] = useState([]);
  const [inputs, setInputs] = useState({});
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);
  const { id } = useParams();
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
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
        const ingredients = getIngredientsAndMeasures(drink);
        setIngredientsAndMeaures(ingredients);
        setInputs((prevState) => {
          const myObject = {};
          ingredients.forEach((_ingredient, index) => {
            myObject[`${index}-checkbox`] = false;
          });
          return {
            ...prevState,
            ...myObject,
          };
        });
        setInputs((prevState) => ({
          ...prevState,
          ...inProgressRecipes.cocktails[idDrink],
        }));
      };
      getIngredientsList();
    }, [drink, idDrink],
  );

  useEffect(
    () => {
      const saveLocalStorage = () => {
        const idRecipeInProgess = JSON.parse(
          localStorage.getItem('inProgressRecipes'),
        );
        if (idRecipeInProgess && idDrink) {
          const newState = {
            meals: inProgressRecipes.meals,
            cocktails: { ...idRecipeInProgess.cocktails, [idDrink]: { ...inputs } },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
          dispatch(saveRecipesDrinkInProgress(newState));
        } else if (idDrink) {
          const newState = {
            meals: inProgressRecipes.meals,
            cocktails: { [idDrink]: { ...inputs } },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
          const newRecipesInProgress = JSON.parse(
            localStorage.getItem('inProgressRecipes'),
          );
          dispatch(saveRecipesDrinkInProgress(newRecipesInProgress));
        }
      };
      saveLocalStorage();
    }, [idDrink, inputs],
  );

  const handleCheckbox = ({ target }) => {
    const { name, checked } = target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const isButtonDisabled = () => {
    const inputValues = Object.values(inputs);
    return inputValues.some((input) => input === false);
  };

  const handleFinishRecipeBtn = () => {
    const data = new Date();
    const formatedDay = data.toLocaleDateString();

    const newDoneRecipe = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: formatedDay,
      tags: drink.strTags !== null ? drink.strTags.split(',') : null,
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const recipes = [...doneRecipes, newDoneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(recipes));
      dispatch(saveRecipesDone(recipes));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
      dispatch(saveRecipesDone([newDoneRecipe]));
    }
    history.push('/done-recipes');
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
        onClick={ () => handleShareButton(idDrink) }

      >
        <img src={ shareIcon } alt="share icon" />

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavButton(drink, favorite, setFavorite) }
        src={ favorite ? blackHeart : whiteHeart }
      >
        {favorite
          ? <img src={ blackHeart } alt="black heart" />
          : <img src={ whiteHeart } alt="white heart" />}
      </button>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <div>
        {drink && ingredientsAndMeasures.map((instruction, i) => (
          <label
            className={ inputs[`${i}-checkbox`] ? 'checked_input' : undefined }
            data-testid={ `${i - 1}-ingredient-step` }
            htmlFor={ `${i}-checkbox` }
            key={ i }
          >
            {instruction.ingredient}
            {instruction.measure}
            <input
              name={ `${i}-checkbox` }
              id={ `${i}-checkbox` }
              defaultChecked={ !!inputs[`${i}-checkbox`] }
              onChange={ handleCheckbox }
              type="checkbox"
            />
          </label>
        ))}
      </div>
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        disabled={ isButtonDisabled() }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipeBtn }
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default DrinkInProgress;
