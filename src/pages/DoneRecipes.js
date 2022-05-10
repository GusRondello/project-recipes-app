import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecomendationCarousel.css';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const componentName = 'done-recipes';
  const pageTitle = 'Done Recipes';
  const [doneRecipes, changeDoneRecipe] = useState([]);
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleShareButton = (recipe) => {
    if (recipe.type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${recipe.id}`);
      toast.success('Link copied!');
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`);
      toast.success('Link copied!');
    }
  };

  useEffect(() => {
    changeDoneRecipe(recipes);
  }, []);

  const filterByFood = () => {
    if (recipes) {
      const foodRecipes = recipes.filter((recipe) => recipe.type !== 'drink');
      changeDoneRecipe(foodRecipes);
    }
  };

  const filterByDrink = () => {
    if (recipes) {
      const foodRecipes = recipes.filter((recipe) => recipe.type !== 'food');
      changeDoneRecipe(foodRecipes);
    }
  };

  const getAllRecipes = () => {
    if (recipes) {
      changeDoneRecipe(recipes);
    }
  };

  const nameAndShareButton = (name, recipe, index) => (
    <div className="name-share-button">
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <button
        type="button"
        className="share-button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => handleShareButton(recipe) }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
    </div>

  );

  return (
    <>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <div className="page-done-recipes">
        <button
          type="button"
          className="filter-btn"
          data-testid="filter-by-all-btn"
          onClick={ getAllRecipes }
        >
          All
        </button>
        <button
          type="button"
          className="filter-btn"
          data-testid="filter-by-food-btn"
          onClick={ filterByFood }
        >
          Food
        </button>
        <button
          type="button"
          className="filter-btn"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drinks
        </button>
        <div className="done-recipes-container">
          { doneRecipes !== [] && doneRecipes !== null
            ? doneRecipes.map((recipe, index) => (
              <Link key={ recipe.name } to={ `${recipe.type}s/${recipe.id}` }>
                <div className="recipe">
                  <div className="done-recipe-image">
                    <img
                      className="image"
                      src={ recipe.image }
                      data-testid={ `${index}-horizontal-image` }
                      alt="Receita"
                    />
                  </div>

                  <div className="recipe-infos">
                    { nameAndShareButton(recipe.name, recipe, index) }
                    {/* <p>
                      { recipe.category }
                    </p> */}
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
                    <h2
                      className="done-date"
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      { recipe.doneDate }
                    </h2>
                    <div className="tag-container">
                      { recipe.tags !== null && recipe.tags.map((tag) => (
                        <p
                          className="tag"
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                          key={ tag }
                        >
                          { tag }
                        </p>
                      )) }
                    </div>
                  </div>
                </div>
              </Link>
            ))
            : null}
        </div>
      </div>
    </>
  );
}

export default DoneRecipes;
