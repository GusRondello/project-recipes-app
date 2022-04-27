import React from 'react';
import { Link } from 'react-router-dom';
import drinksIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinksIcon } data-testid="drinks-bottom-btn" alt="Drink Icon" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="Explore Icon" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Meal Icon" />
      </Link>
    </footer>
  );
}

export default Footer;
