import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import { saveRecipesFoodInProgress, saveRecipesDone } from '../../redux/action/index';
import { getIngredientsAndMeasures } from '../../services/service';
import '../../styles/InProgress.css';

function handleFavButton(recipe, favorite, setFavorite) {
  setFavorite((prevState) => !prevState);
  const {
    strMealThumb,
    idMeal,
    strArea,
    strMeal,
    strCategory,
  } = recipe;

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

const handleShareButton = (idMeal) => {
  clipboardCopy(`http://localhost:3000/foods/${idMeal}`);
  toast.success('Link copied!');
};

function FoodInProgress() {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const inProgressRecipes = useSelector((state) => state.Recipes.inProgressRecipes);
  const [ingredientsAndMeasures, setIngredientsAndMeaures] = useState([]);
  const [inputs, setInputs] = useState({});
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);
  const { id } = useParams();
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const {
    strMealThumb, idMeal,
    strMeal, strCategory,
    strInstructions,
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
        console.log(recipe);
        const ingredients = getIngredientsAndMeasures(recipe);
        console.log(ingredients);
        setIngredientsAndMeaures(ingredients);
        setInputs((prevState) => {
          const myObject = {};
          ingredients.forEach((_ingredient, index) => {
            myObject[`${index}-checkbox`] = false;
          });
          return { ...prevState, ...myObject };
        });
        setInputs((prevState) => ({
          ...prevState,
          ...inProgressRecipes.meals[idMeal],
        }));
      };
      getIngredientsList();
    }, [recipe, idMeal],
  );

  useEffect(
    () => {
      const saveLocalStorage = () => {
        const idRecipeInProgess = JSON.parse(
          localStorage.getItem('inProgressRecipes'),
        );
        if (idRecipeInProgess && idMeal) {
          const newState = {
            meals: {
              ...idRecipeInProgess.meals, [idMeal]: { ...inputs },
            },
            cocktails: inProgressRecipes.cocktails,
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
          dispatch(saveRecipesFoodInProgress(newState));
        } else if (idMeal) {
          const newState = {
            meals: {
              [idMeal]: { ...inputs },
            },
            cocktails: inProgressRecipes.cocktails,
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
          const newRecipesInProgress = JSON.parse(
            localStorage.getItem('inProgressRecipes'),
          );
          dispatch(saveRecipesFoodInProgress(newRecipesInProgress));
        }
      };
      saveLocalStorage();
    }, [idMeal, inputs],
  );

  const handleCheckbox = ({ target }) => {
    const { name, checked } = target;

    setInputs((prevState) => ({ ...prevState, [name]: checked }));
  };

  const isButtonDisabled = () => {
    const inputValues = Object.values(inputs);
    return inputValues.some((input) => input === false);
  };

  const handleFinishRecipeBtn = () => {
    const data = new Date();
    const formatedDay = data.toLocaleDateString();

    const newDoneRecipe = {
      id: recipe.idMeal,
      type: 'food',
      category: recipe.strCategory,
      alcoholicOrNot: '',
      nationality: recipe.strArea,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: formatedDay,
      tags: recipe.strTags !== null ? recipe.strTags.split(',') : null,
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const recipes = [
        ...doneRecipes,
        newDoneRecipe,
      ];
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
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ strMeal }</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => handleShareButton(idMeal) }
      >
        <img src={ shareIcon } alt="share icon" />

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavButton(recipe, favorite, setFavorite) }
        src={ favorite ? blackHeart : whiteHeart }
      >
        {
          favorite
            ? <img src={ blackHeart } alt="black heart" />
            : <img src={ whiteHeart } alt="white heart" />
        }
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      <div>
        {recipe && ingredientsAndMeasures.map((instruction, i) => (
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
        onClick={ handleFinishRecipeBtn }
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </button>
    </section>
  );
}

export default FoodInProgress;
