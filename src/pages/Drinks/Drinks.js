import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import DrinkCard from '../../components/DrinkCard';
import Footer from '../../components/Footer';

const DOZE = 12;
const CINCO = 5;

function Drinks() {
  const [initialRecipes, changeInitialRecipes] = useState([]);
  const [categories, changeInitialCategories] = useState([]);
  const [selectedCategory, changeSelectedCategory] = useState('');

  const recipeDrinks = useSelector((state) => state.FilterRecipeDrink.data);
  const pageTitle = 'Drinks';
  const componentName = 'drinks';

  const getFirstRecipeMeals = async () => {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const recipes = await request.json();
    changeInitialRecipes(recipes.drinks.slice(0, DOZE));
  };

  useEffect(() => {
    const getFirstCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const response = await request.json();
      const firstCategories = response.drinks.slice(0, CINCO);
      changeInitialCategories(firstCategories.map((category) => category.strCategory));
    };

    getFirstRecipeMeals();
    getFirstCategories();
  }, []);

  useEffect(() => {
    if (recipeDrinks !== undefined && recipeDrinks !== null) {
      if (recipeDrinks.length > DOZE) {
        changeInitialRecipes(recipeDrinks.slice(0, DOZE));
      } else {
        changeInitialRecipes(recipeDrinks);
      }
    }
  }, [selectedCategory, recipeDrinks]);

  const getRecipeByCategory = async (categoryName) => {
    const request = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    );
    const response = await request.json();
    const recipes = response.drinks.slice(0, DOZE);
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
      <DrinkCard category={ selectedCategory } recipeDrinks={ initialRecipes } />
      <Footer />
    </div>
  );
}

export default Drinks;
