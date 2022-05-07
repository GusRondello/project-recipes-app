import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const componentName = 'done-recipes';
  const pageTitle = 'Done Recipes';
  const [doneRecipes, changeDoneRecipe] = useState([]);
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleShareButton = (id) => {
    clipboardCopy(`http://localhost:3000/foods/${id}`);
    toast.success('Link copied!');
  };

  useEffect(() => {
    changeDoneRecipe(recipes);
  }, []);

  const filterByFood = () => {
    const foodRecipes = recipes.filter((recipe) => recipe.type !== 'drink');
    changeDoneRecipe(foodRecipes);
  };

  const filterByDrink = () => {
    const foodRecipes = recipes.filter((recipe) => recipe.type !== 'food');
    changeDoneRecipe(foodRecipes);
  };

  const getAllRecipes = () => {
    changeDoneRecipe(recipes);
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getAllRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drinks
      </button>
      { doneRecipes !== []
      && doneRecipes.map((recipe, index) => (
        <div key={ recipe.name }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt="Receita"
          />
          <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          { recipe.tags !== null && recipe.tags.map((tag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tag }
            >
              { tag }
            </p>
          )) }
          <h2 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h2>
          <p>
            { recipe.category }
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareButton(recipe.id) }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share icon" />

          </button>
          {recipe.type === 'drink'
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>
            )
            : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </p>)}

        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
