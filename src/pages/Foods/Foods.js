import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FoodCard from '../../components/FoodCard';

const DOZE = 12;

function Foods() {
  const recipeFoods = useSelector((state) => state.FilterRecipeFood.data);
  const pageTitle = 'Foods';
  const componentName = 'foods';

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {recipeFoods !== null && recipeFoods !== undefined ? (
        <FoodCard
          recipeFoods={ recipeFoods.length > DOZE
            ? recipeFoods.slice(0, DOZE) : recipeFoods }
        />)
        : null}
      <Footer />
    </div>
  );
}

export default Foods;
