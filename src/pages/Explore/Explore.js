import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import '../../styles/Explore.css';

function Explore() {
  const history = useHistory();
  const componentName = 'explore';
  const pageTitle = 'Explore';

  const handleClickFoodsButton = () => {
    history.push('/explore/foods');
  };

  const handleClickDrinksButton = () => {
    history.push('/explore/drinks');
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <main className="button-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-foods"
          onClick={ handleClickFoodsButton }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-drinks"
          onClick={ handleClickDrinksButton }
        >
          Explore Drinks
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
