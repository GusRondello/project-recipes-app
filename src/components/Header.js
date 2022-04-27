import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header({ pageTitle, componentName }) {
  return (
    <header>
      <img src={ profileIcon } data-testid="profile-top-btn" alt="Profile Icon" />
      <h1 data-testid="page-title">{ pageTitle }</h1>
      {componentName === 'drinks'
      || componentName === 'foods'
      || componentName === 'explore-nationalities'
        ? <img src={ searchIcon } data-testid="search-top-btn" alt="Search Button" />
        : null}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default Header;
