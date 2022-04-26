import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/Drinks/DrinkDetails';
import DrinkInProgress from './pages/Drinks/DrinkInProgress';
import Drinks from './pages/Drinks/Drinks';
import Explore from './pages/Explore/Explore';
import ExploreDrinkIngredients from './pages/Explore/ExploreDrinkIngredients';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import ExploreFoodIngredients from './pages/Explore/ExploreFoodIngredients';
import ExploreFoodNationalities from './pages/Explore/ExploreFoodNationalities';
import ExploreFoods from './pages/Explore/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/Foods/FoodDetails';
import FoodInProgress from './pages/Foods/FoodInProgress';
import Foods from './pages/Foods/Foods';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const Routes = () => (
  <Switch>
    <Route component={ Login } path="/" exact />
    <Route component={ Foods } path="/foods" />
    <Route component={ Drinks } path="/drinks" />
    <Route component={ FoodDetails } path="/foods/:id" />
    <Route component={ DrinkDetails } path="/drinks/:id" />
    <Route component={ FoodInProgress } path="/foods/:id/in-progress" />
    <Route component={ DrinkInProgress } path="/drinks/:id/in-progress" />
    <Route component={ Explore } path="/explore" />
    <Route component={ ExploreFoods } path="/explore/foods" />
    <Route component={ ExploreDrinks } path="/explore/drinks" />
    <Route component={ ExploreFoodIngredients } path="/explore/foods/ingredients" />
    <Route component={ ExploreDrinkIngredients } path="/explore/drinks/ingredients" />
    <Route component={ ExploreFoodNationalities } path="/explore/foods/nationalities" />
    <Route component={ Profile } path="/profile" />
    <Route component={ DoneRecipes } path="/done-recipes" />
    <Route component={ FavoriteRecipes } path="/favorite-recipes" />
    <Route component={ NotFound } path="/*" />
  </Switch>
);

export default Routes;