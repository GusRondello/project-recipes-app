import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const component = 'profile';
  const pageTitle = 'Profile';
  return (
    <div>
      <Header pageTitle={ pageTitle } component={ component } />
      <Footer />
    </div>
  );
}

export default Profile;
