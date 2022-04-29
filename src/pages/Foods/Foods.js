import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FoodCard from '../../components/FoodCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const DOZE = 12;
const CINCO = 5;

function Foods() {
  const [initialRecipes, changeInitialRecipes] = useState([]);
  const [categories, changeInitialCategories] = useState([]);
  const [categoriyIsSelected, changeSelectCategory] = useState(false);
  const recipeFoods = useSelector((state) => state.FilterRecipeFood.data);
  const pageTitle = 'Foods';
  const componentName = 'foods';

  useEffect(() => {
    const getFirstRecipeMeals = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recipes = await request.json();
      changeInitialRecipes(recipes.meals.slice(0, DOZE));
    };

    const getFirstCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const response = await request.json();
      const firstCategories = response.meals.slice(0, CINCO);
      changeInitialCategories(firstCategories.map((category) => category.strCategory));
    };
    getFirstRecipeMeals();
    getFirstCategories();
  }, []);

  const getRecipeByCategory = async (categoryName) => {
    console.log(categoryName);
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    );
    const response = await request.json();
    const recipes = response.meals.slice(0, DOZE);
    changeInitialRecipes(recipes);
    changeSelectCategory(!categoriyIsSelected);
    console.log(categoriyIsSelected);
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />

      <nav>
        {categories
          && categories
            .map((categoryName, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${categoryName}-category-filter` }
                onClick={ () => getRecipeByCategory(categoryName) }
              >
                {categoryName}
              </button>))}
      </nav>

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
