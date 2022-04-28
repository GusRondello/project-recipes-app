import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import DrinkCard from '../../components/DrinkCard';
import Footer from '../../components/Footer';

const DOZE = 12;

function Drinks() {
  const recipeDrinks = useSelector((state) => state.FilterRecipeDrink.data);
  const pageTitle = 'Drinks';
  const componentName = 'drinks';

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {recipeDrinks !== undefined && recipeDrinks !== null ? (
        <DrinkCard
          recipeDrinks={ recipeDrinks.length > DOZE
            ? recipeDrinks.slice(0, DOZE) : recipeDrinks }
        />)
        : null}
      <Footer />
    </div>
  );
}

export default Drinks;
