import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

function FavoriteRecipes() {
  const componentName = 'favorite-recipes';
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);
  const [recipes, setRecipes] = useState(favoriteRecipes);
  const pageTitle = 'Favorite Recipes';

  const handleFavButton = ({ target }) => {
    const removeFavorite = recipes.filter((recipe) => recipe.id !== target.id);
    setRecipes(removeFavorite);
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
  };

  const handleShareButton = ({ target }) => {
    toast.success('Link copied!');
    console.log(target);
    const { name, id } = target;
    clipboardCopy(`http://localhost:3000/${name}s/${id}`);
  };

  const handleAllFilter = () => {
    setRecipes(favoriteRecipes);
  };

  const handleFilterFoods = () => {
    const foods = recipes.filter((recipe) => recipe.type === 'food');
    setRecipes(foods);
  };

  const handleFilterDrinks = () => {
    const drinks = recipes.filter((recipe) => recipe.type === 'drink');
    setRecipes(drinks);
  };

  return (
    <div className="page-done-recipes">
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <nav>
        <button
          type="button"
          className="filter-btn"
          data-testid="filter-by-all-btn"
          onClick={ handleAllFilter }
        >
          All

        </button>
        <button
          type="button"
          className="filter-btn"
          data-testid="filter-by-food-btn"
          onClick={ handleFilterFoods }
        >
          Food

        </button>
        <button
          type="button"
          className="filter-btn"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterDrinks }
        >
          Drink

        </button>
      </nav>
      <div className="done-recipes-container">
        {
          recipes.length !== 0
          && recipes.map((recipe, index) => (
            <div className="recipe" key={ recipe.id }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <div className="done-recipe-image">
                  <img
                    className="image"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                </div>
              </Link>
              <div className="recipe-infos">
                {
                  recipe.type === 'food'
                    ? (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${recipe.nationality} - ${recipe.category}`}

                      </p>
                    )
                    : (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {recipe.alcoholicOrNot}

                      </p>
                    )
                }
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h2
                    data-testid={ `${index}-horizontal-name` }
                    name={ recipe.type }
                    id={ recipe.id }
                  >
                    {recipe.name}

                  </h2>
                </Link>
                <div className="share-and-favorite-btn">
                  <button
                    type="button"
                    className="share-btn"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    name={ recipe.type }
                    value={ recipe.id }
                    onClick={ handleShareButton }
                  >
                    <img
                      name={ recipe.type }
                      id={ recipe.id }
                      src={ shareIcon }
                      alt="share icon"
                    />

                  </button>
                  <button
                    type="button"
                    className="favorite-btn"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ handleFavButton }
                    id={ recipe.id }
                    src={ blackHeart }
                  >
                    <img
                      id={ recipe.id }
                      src={ blackHeart }
                      alt="black heart"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
