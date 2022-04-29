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
  const recipeDrinks = useSelector((state) => state.FilterRecipeDrink.data);
  const pageTitle = 'Drinks';
  const componentName = 'drinks';

  useEffect(() => {
    const getFirstRecipeMeals = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const recipes = await request.json();
      changeInitialRecipes(recipes.drinks.slice(0, DOZE));
    };

    const getFirstCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const response = await request.json();
      const firstCategories = response.drinks.slice(0, CINCO);
      changeInitialCategories(firstCategories.map((category) => category.strCategory));
    };

    getFirstRecipeMeals();
    getFirstCategories();
  }, []);

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
              >
                {categoryName}
              </button>))}
      </nav>

      {recipeDrinks !== undefined && recipeDrinks !== null ? (
        <DrinkCard
          recipeDrinks={ recipeDrinks.length > DOZE
            ? recipeDrinks.slice(0, DOZE) : recipeDrinks }
        />)
        : <DrinkCard recipeDrinks={ initialRecipes } />}
      <Footer />
    </div>
  );
}

export default Drinks;
