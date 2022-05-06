import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const componentName = 'done-recipes';
  const pageTitle = 'Done Recipes';
  const doneRecipesDrinks = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { doneRecipesDrinks
      && doneRecipesDrinks.map((recipe, index) => (
        <div key={ recipe.name }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt="Receita"
          />
          <h2 data-testid={ `${index}-horizontal-done-date` }>{ recipe.id }</h2>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareButton(idDrink) }
          >
            <img src={ shareIcon } alt="share icon" />

          </button>
          { recipe.tags !== null && recipe.tags.map((tag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tag }
            >
              { tag }
            </p>
          )) }
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
