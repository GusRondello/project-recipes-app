import React, { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DOZE = 12;

function ExploreFoodNationalities() {
  const [initialRecipes, changeInitialRecipes] = useState([]);
  const [nationalities, changeNationalities] = useState([]);
  const [selectedNationality, changeSelectedNationalities] = useState('');
  const componentName = 'explore-nationalities';
  const pageTitle = 'Explore Nationalities';

  const getFirstRecipeMeals = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const recipes = await request.json();
    changeInitialRecipes(recipes.meals.slice(0, DOZE));
  };

  useEffect(() => {
    const getNationaliries = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const nationalitiesList = data.meals.map((nationality) => nationality.strArea);
      changeNationalities(nationalitiesList);
    };
    getNationaliries();
    getFirstRecipeMeals();
  }, []);

  useEffect(() => {
    if (selectedNationality !== '') {
      if (selectedNationality === 'All') {
        getFirstRecipeMeals();
      } else {
        const getRecipes = async () => {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedNationality}`);
          const recipes = await response.json();
          changeInitialRecipes(recipes.meals.slice(0, DOZE));
        };
        getRecipes();
      }
    }
  }, [selectedNationality]);

  const handleChange = ({ target }) => {
    changeSelectedNationalities(target.value);
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
      <select data-testid="explore-by-nationality-dropdown" onChange={ handleChange }>
        <option data-testid="All-option">All</option>
        {nationalities
          .map((nationality) => (
            <option
              key={ nationality }
              value={ nationality }
              data-testid={ `${nationality}-option` }
            >
              {nationality}
            </option>))}
      </select>
      <FoodCard category="" recipeFoods={ initialRecipes } />
      <Footer />
    </div>
  );
}

export default ExploreFoodNationalities;
