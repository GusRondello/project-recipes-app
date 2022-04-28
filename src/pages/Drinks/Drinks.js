import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import DrinkCard from '../../components/DrinkCard';
import Footer from '../../components/Footer';

const DOZE = 12;

function Drinks() {
  const [initialRecipes, changeInitialRecipes] = useState([]);
  const recipeDrinks = useSelector((state) => state.FilterRecipeDrink.data);
  const pageTitle = 'Drinks';
  const componentName = 'drinks';

  useEffect(() => {
    const getFirstRecipeMeals = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const recipes = await request.json();
      changeInitialRecipes(recipes.drinks.slice(0, DOZE));
    };
    getFirstRecipeMeals();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } componentName={ componentName } />
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
