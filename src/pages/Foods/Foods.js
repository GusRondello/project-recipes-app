import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FoodCard from '../../components/FoodCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DOZE = 12;

function Foods() {
  const [initialRecipes, changeInitialRecipes] = useState([]);
  const recipeFoods = useSelector((state) => state.FilterRecipeFood.data);
  const pageTitle = 'Foods';
  const componentName = 'foods';

  useEffect(() => {
    const getFirstRecipeMeals = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recipes = await request.json();
      changeInitialRecipes(recipes.meals.slice(0, DOZE));
    };
    getFirstRecipeMeals();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      {recipeFoods !== null && recipeFoods !== undefined ? (
        <FoodCard
          recipeFoods={ recipeFoods.length > DOZE
            ? recipeFoods.slice(0, DOZE) : recipeFoods }
        />)
        : <FoodCard recipeFoods={ initialRecipes } />}
      <Footer />
    </div>
  );
}

export default Foods;
