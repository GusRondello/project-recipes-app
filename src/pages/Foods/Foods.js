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
  const [selectedCategory, changeSelectedCategory] = useState('');
  const recipeFoods = useSelector((state) => state.FilterRecipeFood.data);
  const pageTitle = 'Foods';
  const componentName = 'foods';

  const getFirstRecipeMeals = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const recipes = await request.json();
    changeInitialRecipes(recipes.meals.slice(0, DOZE));
  };

  useEffect(() => {
    const getFirstCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const response = await request.json();
      const firstCategories = response.meals.slice(0, CINCO);
      changeInitialCategories(firstCategories.map((category) => category.strCategory));
    };
    getFirstRecipeMeals();
    getFirstCategories();
  }, []);

  useEffect(() => {
  }, [selectedCategory]);

  const getRecipeByCategory = async (categoryName) => {
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    );
    const response = await request.json();
    const recipes = response.meals.slice(0, DOZE);
    changeInitialRecipes(recipes);
  };

  const handleClick = ({ target }) => {
    const category = target.name;
    if (selectedCategory === category) {
      getFirstRecipeMeals();
      changeSelectedCategory('');
    } else {
      changeSelectedCategory(category);
      getRecipeByCategory(category);
    }
  };

  const cleanFilterByCategory = () => {
    getFirstRecipeMeals();
    changeSelectedCategory('');
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />

      <nav>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ cleanFilterByCategory }
        >
          All
        </button>
        {categories
          && categories
            .map((categoryName, index) => (
              <button
                type="button"
                key={ index }
                name={ categoryName }
                data-testid={ `${categoryName}-category-filter` }
                onClick={ handleClick }
              >
                {categoryName}
              </button>))}
      </nav>

      {recipeFoods !== null && recipeFoods !== undefined ? (
        <FoodCard
          recipeFoods={ recipeFoods.length > DOZE
            ? recipeFoods.slice(0, DOZE) : recipeFoods }
        />)
        : <FoodCard category={ selectedCategory } recipeFoods={ initialRecipes } />}
      <Footer />
    </div>
  );
}

export default Foods;
