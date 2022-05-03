import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

function Header({ pageTitle, componentName }) {
  const [searchInput, changeSearchInput] = useState(false);

  const updateButton = () => {
    changeSearchInput(!searchInput);
  };

  return (
    <>
      <header>
        <Link to="/profile">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="Profile Icon" />
        </Link>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        {componentName === 'drinks'
      || componentName === 'foods'
      || componentName === 'explore-nationalities'
          ? (
            <button
              type="button"
              onClick={ updateButton }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="Button Profile" />
            </button>)
          : null}
      </header>
      {searchInput
        && <SearchBar recipeType={ componentName } />}
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default Header;
