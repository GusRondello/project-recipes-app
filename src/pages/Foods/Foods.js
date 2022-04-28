import React from 'react';
import { useSelector } from 'react-redux';
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
      {recipeFoods && (
        <FoodCard
          recipeFoods={ recipeFoods.length > DOZE
            ? recipeFoods.slice(0, DOZE) : recipeFoods }
        />)}
    </div>
  );
}

export default Foods;
