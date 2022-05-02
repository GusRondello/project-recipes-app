import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FoodCard from '../../components/FoodCard';

const DOZE = 12;

function ExploreFoodNationalities() {
  const [initialRecipes, changeInitialRecipes] = useState([]);
  const [nationalities, changeNationalities] = useState([]);
  const componentName = 'explore-nationalities';
  const pageTitle = 'Explore Nationalities';

  useEffect(() => {
    const getFirstRecipeMeals = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recipes = await request.json();
      changeInitialRecipes(recipes.meals.slice(0, DOZE));
    };
    const getNationaliries = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const nationalitiesList = data.meals.map((nationality) => nationality.strArea);
      changeNationalities(nationalitiesList);
    };
    getNationaliries();
    getFirstRecipeMeals();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <select data-testid="explore-by-nationality-dropdown">
        <option>All</option>
        {nationalities
          .map((nationality) => (
            <option key={ nationality } data-testid={ `${nationality}-option` }>
              {nationality}
            </option>))}
      </select>
      <FoodCard category="" recipeFoods={ initialRecipes } />
      <Footer />
    </div>
  );
}

export default ExploreFoodNationalities;
