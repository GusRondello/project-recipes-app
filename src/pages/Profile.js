import 'bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

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
      <main className="page-profile">
        <h2
          className="profile-email"
          data-testid="profile-email"
        >
          {!userObj ? null : userObj.email}
        </h2>
        <div className="button-container">
          <Link
            className="w-100 btn button-element"
            to="/done-recipes"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </Link>
          <Link
            className="w-100 btn button-element"
            to="/favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Link>
          <button
            className="w-100 btn button-element"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogoutButton }
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Profile;
