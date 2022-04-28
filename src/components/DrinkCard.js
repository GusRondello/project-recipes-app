import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ recipeDrinks }) {
  return (
    <div>
      { recipeDrinks.map((recipe, index) => (
        <Link to={ `/drinks/${recipe.idDrink}` } key={ recipe.idDrink }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt="Drink"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h1>
          </div>
        </Link>
      )) }
    </div>
  );
}

DrinkCard.propTypes = {
  recipeDrinks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default DrinkCard;
