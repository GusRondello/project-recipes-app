import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import '../styles/DrinkCard.css';

function DrinkCard({ recipeDrinks }) {
  return (
    <div className="page-recipe-drink">
      {recipeDrinks.length === 1
      && <Redirect to={ `/drinks/${recipeDrinks[0].idDrink}` } />}
      { recipeDrinks.map((recipe, index) => (
        <Link to={ `/drinks/${recipe.idDrink}` } key={ recipe.idDrink }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              className="recipe-drink-image"
              src={ recipe.strDrinkThumb }
              alt="Drink"
              data-testid={ `${index}-card-img` }
            />
            <h1
              className="food-card-name"
              data-testid={ `${index}-card-name` }
            >
              { recipe.strDrink }
            </h1>
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
