import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FavoriteRecipes() {
  const componentName = 'favorite-recipes';
  const [favorite, setFavorite] = useState(true);
  const pageTitle = 'Favorite Recipes';
  const favoriteRecipes = useSelector((state) => state.Recipes.favoriteRecipes);

  const handleFavButton = () => {
    setFavorite((prevState) => !prevState);
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
          favoriteRecipes
          && favoriteRecipes.map((recipe, index) => (
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
                // onClick={ handleShareButton }
              >
                <img src={ shareIcon } alt="share icon" />

              </button>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
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
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
