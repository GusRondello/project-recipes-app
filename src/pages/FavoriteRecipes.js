import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

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

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <nav>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      </nav>
      <div>
        {
          recipes.length !== 0
          && recipes.map((recipe, index) => (
            <div key={ recipe.id }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
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
              <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
              <button
                type="button"
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
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
