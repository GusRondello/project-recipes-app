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
      <main className="explore-container">
        <div className="button-container">
          <button
            type="button"
            className="w-100 btn explore-btn"
            data-testid="explore-foods"
            onClick={ handleClickFoodsButton }
          >
            Explore Foods
          </button>
          <button
            type="button"
            className="w-100 btn explore-btn"
            data-testid="explore-drinks"
            onClick={ handleClickDrinksButton }
          >
            Explore Drinks
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
