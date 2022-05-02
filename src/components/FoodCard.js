import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import '../styles/FoodCard.css';

function FoodCard({ category, recipeFoods }) {
  return (
    <div className="page-recipe-food">
      {recipeFoods.length === 1 && (category === '' || category === undefined)
        ? <Redirect to={ `/foods/${recipeFoods[0].idMeal}` } />
        : null}
      { recipeFoods.map((recipe, index) => (
        <Link to={ `/foods/${recipe.idMeal}` } key={ recipe.idMeal }>
          <div
            data-testid={ `${index}-recipe-card` }
            className="food-card-container"
          >
            <img
              className="recipe-image"
              src={ recipe.strMealThumb }
              alt="Food"
              data-testid={ `${index}-card-img` }
            />
            <h1
              data-testid={ `${index}-card-name` }
              className="food-card-name"
            >
              { recipe.strMeal }
            </h1>
          </div>
        </Link>
      )) }
    </div>
  );
}

FoodCard.propTypes = {
  recipeFoods: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  category: PropTypes.string.isRequired,
};

export default FoodCard;
