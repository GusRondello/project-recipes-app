import React from 'react';
import Header from '../components/Header';

function Profile() {
  const component = 'profile';
  const pageTitle = 'Profile';
  return (
    <div>
      <Header pageTitle={ pageTitle } component={ component } />
    </div>
  );
}

export default Profile;
