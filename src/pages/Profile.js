import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const userInfo = window.localStorage.getItem('user');
  const userObj = JSON.parse(userInfo);

  const component = 'profile';
  const pageTitle = 'Profile';

  const handleLogoutButton = () => {
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ component } />
      <h2 data-testid="profile-email">
        {!userObj ? null : userObj.email}
      </h2>
      <Link
        to="/done-recipes"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </Link>
      <Link
        to="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogoutButton }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Profile;
