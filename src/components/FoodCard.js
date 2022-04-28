import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodCard({ recipeFoods }) {
  return (
    <div>
      { recipeFoods.map((recipe, index) => (
        <Link to={ `/foods/${recipe.idMeal}` } key={ recipe.idMeal }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt="Food"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h1>
          </div>
        </Link>
      )) }
    </div>
  );
}

FoodCard.propTypes = {
  recipeFoods: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default FoodCard;
